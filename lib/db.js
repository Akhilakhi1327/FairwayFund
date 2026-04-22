import { prisma } from './prisma';

export async function getCharities() {
  return await prisma.charity.findMany();
}

export async function getFeaturedCharity() {
  return await prisma.charity.findFirst({ where: { featured: true } });
}

export async function getUser(id) {
  return await prisma.user.findUnique({
    where: { id },
    include: { subscription: true, scores: true, winnings: true }
  });
}

export async function getUserScores(userId) {
  return await prisma.score.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 5
  });
}
