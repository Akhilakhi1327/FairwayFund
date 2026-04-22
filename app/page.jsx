import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="hero" style={{ animation: 'fadeIn 1s ease-in' }}>
        <h1>Play. Win. <span style={{ color: 'var(--secondary)' }}>Give Back.</span></h1>
        <p>The only platform that turns your golf scores into a chance to win massive monthly jackpots while supporting charities you care about.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/signup" className="btn btn-primary">Start Your Journey</Link>
          <Link href="/charities" className="btn btn-outline">Explore Charities</Link>
        </div>
      </section>

      <section className="grid grid-3" style={{ marginBottom: '60px' }}>
        <div className="box">
          <h2 style={{ marginBottom: '15px', color: 'var(--primary)' }}>1. Subscribe & Play</h2>
          <p>Join our monthly or yearly plan. Head to the course, play your best, and enter your latest Stableford scores.</p>
        </div>
        <div className="box">
          <h2 style={{ marginBottom: '15px', color: 'var(--success)' }}>2. Win Big</h2>
          <p>Your scores automatically enter you into our monthly algorithmic draw. Match numbers to win your share of the prize pool!</p>
        </div>
        <div className="box">
          <h2 style={{ marginBottom: '15px', color: 'var(--secondary)' }}>3. Support Charity</h2>
          <p>A minimum of 10% of your subscription goes directly to the charity of your choice. Real impact, every single month.</p>
        </div>
      </section>
      
      <section style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '60px', borderRadius: '20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Ready to make an impact?</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>Join thousands of players winning cash and helping causes worldwide.</p>
        <Link href="/signup" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)' }}>Subscribe Now</Link>
      </section>
    </div>
  );
}
