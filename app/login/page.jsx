import { loginAction } from '@/lib/actions';

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="box">
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Welcome Back</h1>
        
        <form action={loginAction}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" required placeholder="john@example.com" />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" required placeholder="••••••••" />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
            Login
          </button>
        </form>
        
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account? <a href="/signup" style={{ color: 'var(--primary)' }}>Sign up here</a>
        </p>
      </div>
    </div>
  );
}
