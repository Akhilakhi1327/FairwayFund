export default function HowItWorks() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '40px' }}>How Digital Heroes Works</h1>
      
      <div className="box" style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>1. The Subscription</h2>
        <p>Choose between a monthly or yearly subscription. Your contribution powers the prize pools and supports vital charitable work. 10% of your fee is automatically set aside for your chosen charity, but you can always choose to give more.</p>
      </div>

      <div className="box" style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--success)', marginBottom: '15px' }}>2. Track Your Game</h2>
        <p>After each round of golf, enter your Stableford score (1-45). We retain your 5 most recent scores. Every score you enter increases your engagement and keeps you eligible for the monthly draws.</p>
      </div>

      <div className="box" style={{ marginBottom: '30px' }}>
        <h2 style={{ color: 'var(--secondary)', marginBottom: '15px' }}>3. The Monthly Draw</h2>
        <p>Every month, we execute a draw. It could be a standard random lottery or our unique "Frequency Algorithm" which weights winning numbers based on the most common scores recorded that month across our community.</p>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Prize Pool Distribution:</h3>
          <ul style={{ paddingLeft: '20px' }}>
            <li><strong>5-Number Match:</strong> 40% of pool (Jackpot Rollover)</li>
            <li><strong>4-Number Match:</strong> 35% of pool</li>
            <li><strong>3-Number Match:</strong> 25% of pool</li>
          </ul>
        </div>
      </div>

      <div className="box">
        <h2 style={{ color: 'var(--primary)', marginBottom: '15px' }}>4. Win and Give</h2>
        <p>If you match numbers, you win a share of the pool! Upload a screenshot of your score from your golf app to verify your participation. Once approved, we pay out your winnings directly. All while knowing you've helped your favorite cause.</p>
      </div>
    </div>
  );
}
