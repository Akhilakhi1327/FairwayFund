import { prisma } from './prisma';

export async function runDraw(monthYear, type = 'random') {
    let winningNumbers = [];
    
    if (type === 'random') {
        // Standard lottery style: 5 numbers between 1 and 45
        while(winningNumbers.length < 5) {
            let n = Math.floor(Math.random() * 45) + 1;
            if(!winningNumbers.includes(n)) winningNumbers.push(n);
        }
    } else {
        // Algorithmic: Weighted by most frequent scores in this month
        const scores = await prisma.score.findMany({
            where: { date: { startsWith: monthYear } }
        });
        
        if (scores.length < 10) {
            // Fallback to random if not enough data
            return runDraw(monthYear, 'random');
        }
        
        // Count frequencies
        const freq = {};
        scores.forEach(s => {
            freq[s.score] = (freq[s.score] || 0) + 1;
        });
        
        // Get top 5 most frequent scores
        winningNumbers = Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(e => parseInt(e[0]));
            
        // Fill up if less than 5 unique scores
        while(winningNumbers.length < 5) {
             let n = Math.floor(Math.random() * 45) + 1;
             if(!winningNumbers.includes(n)) winningNumbers.push(n);
        }
    }
    
    const draw = await prisma.draw.create({
        data: {
            monthYear,
            drawnNumbers: winningNumbers.join(', '),
            status: 'simulated'
        }
    });

    return draw;
}

export async function calculateJackpot(subscriberCount) {
    // A portion of each subscription contributes to the prize pool
    // Monthly: $20, Yearly: $200 (~$16.6/mo)
    // Let's say $5 per subscriber goes to pool
    return subscriberCount * 5;
}
