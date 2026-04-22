'use server';

import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { login as setAuthCookie } from './auth';
import { redirect } from 'next/navigation';

export async function signupAction(formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  const name = formData.get('name');
  const plan = formData.get('plan');
  const charityId = formData.get('charityId');

  if (!email || !password || !name) {
    return { error: 'Please fill in all fields' };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: 'Email already exists' };

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      charityId,
      subscription: {
        create: {
          plan,
          status: 'active',
          renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        }
      }
    }
  });

  await setAuthCookie(user);
  redirect('/dashboard');
}

export async function loginAction(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: 'Invalid credentials' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { error: 'Invalid credentials' };

  await setAuthCookie(user);
  redirect('/dashboard');
}

export async function addScoreAction(formData) {
  const score = parseInt(formData.get('score'));
  const date = formData.get('date');
  const userId = formData.get('userId');

  if (score < 1 || score > 45) return { error: 'Score must be between 1 and 45' };

  try {
    // Only one entry per date
    await prisma.score.create({
      data: { userId, score, date }
    });

    // Handle "Last 5 scores" logic - done by fetching last 5 in UI
    // Replacement logic: if we wanted to truncate, we could delete oldest if > 5.
    // PRD says "Only the latest 5 scores are retained at any time"
    const userScores = await prisma.score.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    });

    if (userScores.length > 5) {
      const oldestId = userScores[5].id;
      await prisma.score.delete({ where: { id: oldestId } });
    }

    return { success: true };
  } catch (err) {
    if (err.code === 'P2002') return { error: 'Already entered a score for this date' };
    return { error: 'Failed to save score' };
  }
}
