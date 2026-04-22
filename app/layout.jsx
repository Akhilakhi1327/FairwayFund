import './globals.css';
import Link from 'next/link';
import { getSession } from '../lib/auth';

export const metadata = {
  title: 'Digital Heroes | Play, Win, Give Back',
  description: 'The platform that combines golf performance tracking, charity fundraising, and a monthly draw-based reward engine.',
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="nav">
            <Link href="/" className="nav-logo">
              Digital Heroes
            </Link>
            <div className="nav-links">
              <Link href="/charities">Charities</Link>
              {session ? (
                <>
                  <Link href="/dashboard">Dashboard</Link>
                  {session.role === 'admin' && <Link href="/admin">Admin</Link>}
                  <Link href="/api/logout" className="btn btn-outline" style={{ padding: '8px 16px' }}>Logout</Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn btn-outline" style={{ padding: '8px 16px' }}>Login</Link>
                  <Link href="/signup" className="btn btn-primary" style={{ padding: '8px 16px' }}>Subscribe</Link>
                </>
              )}
            </div>
          </nav>
          
          <main>
            {children}
          </main>
          
          <footer style={{ marginTop: '80px', padding: '40px 0', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--gray)' }}>
            <p>&copy; {new Date().getFullYear()} Digital Heroes. All rights reserved.</p>
            <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>A conceptual sample project.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
