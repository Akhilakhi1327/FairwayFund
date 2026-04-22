import { getSession } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { runDraw } from '../../lib/draw';
import { revalidatePath } from 'next/cache';

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session || session.role !== 'admin') redirect('/');

  // Server Actions inside Admin for execution
  async function handleRunDraw(formData) {
    'use server';
    const monthYear = new Date().toISOString().slice(0, 7);
    await runDraw(monthYear, 'random');
    revalidatePath('/admin');
  }

  async function handlePublishResults(formData) {
    'use server';
    const latestDraw = await prisma.draw.findFirst({
        orderBy: { createdAt: 'desc' }
    });
    if (latestDraw) {
        await prisma.draw.update({
            where: { id: latestDraw.id },
            data: { status: 'published' }
        });
        
        // Mock email logic
        console.log(`[EMAIL NOTIFICATION] Results published for ${latestDraw.monthYear}!`);
    }
    revalidatePath('/admin');
  }

  const stats = {
    users: await prisma.user.count(),
    charities: await prisma.charity.count(),
    draws: await prisma.draw.count(),
    prizePool: (await prisma.user.count()) * 5, // Logic mentioned in PRD
  };

  const users = await prisma.user.findMany({
      include: { subscription: true },
      take: 10
  });

  const latestDraw = await prisma.draw.findFirst({
      orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Admin Control Center</h1>

      <div className="grid grid-3" style={{ marginBottom: '40px' }}>
        <div className="box" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Total Users</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.users}</p>
        </div>
        <div className="box" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Prize Pool</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>${stats.prizePool}</p>
        </div>
        <div className="box" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Total Charities</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.charities}</p>
        </div>
      </div>

      <div className="grid grid-2" style={{ alignItems: 'start' }}>
        <div className="box">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <h2>Recent Users</h2>
            <Link href="/admin/users" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>View All</Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Plan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.subscription?.plan || 'N/A'}</td>
                    <td style={{ color: u.subscription?.status === 'active' ? 'var(--success)' : 'var(--secondary)' }}>
                        {u.subscription?.status || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="box">
          <h2>Draw Management</h2>
          <p style={{ marginBottom: '20px', color: 'var(--gray)' }}>Configure and execute monthly prize draws.</p>
          
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            {latestDraw ? (
                <>
                    <p style={{ fontWeight: '600' }}>Latest Draw: {latestDraw.monthYear}</p>
                    <p style={{ fontSize: '0.9rem' }}>Numbers: {latestDraw.drawnNumbers}</p>
                    <p style={{ fontSize: '0.9rem', color: latestDraw.status === 'published' ? 'var(--success)' : 'orange' }}>
                        Status: {latestDraw.status.toUpperCase()}
                    </p>
                </>
            ) : (
                <p style={{ fontWeight: '600' }}>No draws executed yet.</p>
            )}
          </div>
          
          <div className="grid grid-2">
            <form action={handleRunDraw}>
                <button type="submit" className="btn btn-primary" style={{ fontSize: '0.9rem', width: '100%' }}>Run Simulation</button>
            </form>
            <form action={handlePublishResults}>
                <button type="submit" className="btn btn-secondary" style={{ fontSize: '0.9rem', width: '100%', opacity: latestDraw?.status === 'published' ? 0.5 : 1 }}>Publish Results</button>
            </form>
          </div>
          <div style={{ marginTop: '20px' }}>
              <Link href="/admin/winners" className="btn btn-outline" style={{ width: '100%', fontSize: '0.9rem' }}>Review Winners</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
