import { getCharities } from '../../lib/db';

export default async function CharitiesPage() {
  const charities = await getCharities();
  const featured = charities.find(c => c.featured);
  const others = charities.filter(c => !c.featured);

  return (
    <div>
      <section className="hero" style={{ padding: '40px 0', marginBottom: '40px' }}>
        <h1>Our Charity Partners</h1>
        <p>A portion of every subscription goes directly to our trusted partners. Choose the cause that resonates with you.</p>
      </section>

      {featured && (
        <section className="box" style={{ marginBottom: '60px', border: '2px solid var(--primary)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-15px', left: '20px', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            FEATURED PARTNER
          </span>
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>{featured.name}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--gray)', marginBottom: '20px' }}>{featured.description}</p>
              <button className="btn btn-primary">Support This Cause</button>
            </div>
            <div style={{ height: '300px', backgroundColor: '#e2e8f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)' }}>
              {/* Image placeholder */}
              [ Charity Impact Image ]
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-3">
        {others.map(c => (
          <div key={c.id} className="box">
            <h3 style={{ marginBottom: '10px' }}>{c.name}</h3>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginBottom: '20px' }}>{c.description}</p>
            <button className="btn btn-outline" style={{ width: '100%' }}>View Profile</button>
          </div>
        ))}
        {others.length === 0 && !featured && (
             <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                <p>We are currently onboarding new partners. Stay tuned!</p>
             </div>
        )}
      </div>
    </div>
  );
}
