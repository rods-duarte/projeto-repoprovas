import bcrypt from 'bcrypt';
import prisma from '../src/config/database.js';

async function main() {
  await prisma.user.upsert({
    create: {
      email: 'admin@admin.com',
      password: bcrypt.hashSync('123', 10),
    },
    update: {},
    where: {
      email: 'admin@admin.com',
    },
  });
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
