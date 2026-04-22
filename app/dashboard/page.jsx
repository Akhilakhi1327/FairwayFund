import { getSession } from '../../lib/auth';
import { getUser, getUserScores, getCharities } from '../../lib/db';
import { addScoreAction } from '../../lib/actions';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const user = await getUser(session.id);
  const recentScores = await getUserScores(session.id);
  const charities = await getCharities();
  const selectedCharity = charities.find(c => c.id === user.charityId);

  return (
    <div className="grid grid-2" style={{ alignItems: 'start' }}>
      <div className="grid" style={{ gap: '20px' }}>
        {/* Subscription Status */}
        <div className="box">
          <h2 style={{ marginBottom: '15px' }}>Subscription</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontWeight: '600', color: user.subscription?.status === 'active' ? 'var(--success)' : 'var(--secondary)' }}>
                {user.subscription?.status.toUpperCase() || 'NO ACTIVE PLAN'}
              </p>
              <p style={{ fontSize: '0.9rem', color: var(--gray) }}>
                {user.subscription?.plan === 'monthly' ? 'Monthly Plan' : 'Yearly Plan'}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.9rem' }}>Renewal Date:</p>
              <p style={{ fontWeight: '500' }}>
                {user.subscription?.renewalDate ? new Date(user.subscription.renewalDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Score Entry */}
        <div className="box">
          <h2 style={{ marginBottom: '15px' }}>Enter Golf Score</h2>
          <form action={addScoreAction}>
            <input type="hidden" name="userId" value={user.id} />
            <div className="grid grid-2">
              <div className="input-group">
                <label>Stableford Score (1-45)</label>
                <input type="number" name="score" min="1" max="45" required />
              </div>
              <div className="input-group">
                <label>Date of Play</label>
                <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Score</button>
          </form>
        </div>

        {/* Recent Scores */}
        <div className="box">
          <h2 style={{ marginBottom: '15px' }}>Your Last 5 Scores</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {recentScores.map(s => (
                  <tr key={s.id}>
                    <td>{s.date}</td>
                    <td>{s.score}</td>
                  </tr>
                ))}
                {recentScores.length === 0 && (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>No scores entered yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gap: '20px' }}>
        {/* Charity Selection */}
        <div className="box">
          <h2 style={{ marginBottom: '15px' }}>Your Impact</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user.charityPct}%
            </div>
            <div>
              <p style={{ fontWeight: '600' }}>{selectedCharity?.name || 'No Charity Selected'}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>Contribution Percentage</p>
            </div>
          </div>
          <Link href="/charities" className="btn btn-outline" style={{ width: '100%', fontSize: '0.9rem' }}>Change Charity</Link>
        </div>

        {/* Winnings SUMMARY */}
        <div className="box">
          <h2 style={{ marginBottom: '15px' }}>Winnings & Jackpots</h2>
          <div style={{ padding: '20px', textAlign: 'center', background: '#f1f5f9', borderRadius: '10px' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>Total Won</p>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>$0.00</p>
          </div>
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Recent Participation</h3>
            {user.winnings.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>No prize draws entered yet. Keep playing!</p>
            ) : (
                <p>You have {user.winnings.length} entries.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
