import prisma from '../src/config/database.js';

async function clearDb() {
  await prisma.$executeRaw`TRUNCATE TABLE TESTS`;
  await prisma.$executeRaw`TRUNCATE TABLE CATEGORIES CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE TEACHERS CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE DISCIPLINES CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE TERMS CASCADE`;
}

async function main() {
  if (process.env.MODE === 'test') clearDb();
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
