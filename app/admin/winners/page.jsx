import { prisma } from '../../../lib/prisma';

export default async function AdminWinnersPage() {
  const winnings = await prisma.winning.findMany({
    include: { user: true, draw: true },
    orderBy: { prizeAmount: 'desc' }
  });

  return (
    <div>
      <h1 style={{ marginBottom: '30px' }}>Winner Verification</h1>
      
      <div className="box">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Draw</th>
                <th>Matches</th>
                <th>Prize</th>
                <th>Status</th>
                <th>Proof</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {winnings.map(w => (
                <tr key={w.id}>
                  <td>{w.user.name}</td>
                  <td>{w.draw.monthYear}</td>
                  <td>{w.matchCount}</td>
                  <td>${w.prizeAmount.toFixed(2)}</td>
                  <td>
                    <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '0.8rem',
                        backgroundColor: w.status === 'paid' ? 'var(--success)' : '#fde68a',
                        color: w.status === 'paid' ? 'white' : '#92400e'
                    }}>
                        {w.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {w.proofUrl ? <a href={w.proofUrl} target="_blank" style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>View Proof</a> : 'None'}
                  </td>
                  <td>
                    {w.status === 'pending' && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>Verify</button>
                            <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>Reject</button>
                        </div>
                    )}
                  </td>
                </tr>
              ))}
              {winnings.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>No winners recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
