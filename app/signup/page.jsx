import { getSession } from '../../lib/auth';
import { getUser, getUserScores, getCharities } from '../../lib/db';
import { addScoreAction } from '../../lib/actions';
import { signupAction } from '../../lib/actions';

export default async function SignupPage() {
  const charities = await getCharities();

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="box">
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Join Digital Heroes</h1>
        <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '30px' }}>
          Subscribe to start playing and supporting your favorite charity.
        </p>
        
        <form action={signupAction}>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="name" required placeholder="John Doe" />
          </div>
          
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="john@example.com" />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="••••••••" />
          </div>
          
          <div className="input-group">
            <label>Subscription Plan</label>
            <select name="plan" required>
              <option value="monthly">Monthly ($20/mo)</option>
              <option value="yearly">Yearly ($200/yr - Save 20%)</option>
            </select>
          </div>
          
          <div className="input-group">
            <label>Select Your Charity</label>
            <select name="charityId" required>
              {charities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
              {charities.length === 0 && <option value="">No charities available yet</option>}
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Subscribe & Create Account
          </button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--primary)' }}>Login here</a>
        </p>
      </div>
    </div>
  );
}
