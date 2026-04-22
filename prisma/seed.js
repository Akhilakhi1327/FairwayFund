const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create Charities
  const charities = [
    {
      name: 'Green Fairways Foundation',
      description: 'Dedicated to preserving local ecosystems through sustainable golf course management.',
      featured: true,
    },
    {
      name: 'Junior Birdies Trust',
      description: 'Providing golf equipment and training to underprivileged children.',
      featured: false,
    },
    {
      name: 'Caddy Care',
      description: 'Supporting retired caddies and their families with healthcare and pensions.',
      featured: false,
    }
  ];

  for (const charity of charities) {
    await prisma.charity.upsert({
      where: { id: charity.name }, // This is fake, but we use updateOrCreate logic
      update: {},
      create: charity,
    }).catch(e => {
        // Upsert by ID would be better, but we just want to seed
        return prisma.charity.create({ data: charity });
    });
  }

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@digitalheroes.co.in' },
    update: {},
    create: {
      email: 'admin@digitalheroes.co.in',
      password: adminPassword,
      name: 'System Admin',
      role: 'admin',
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
