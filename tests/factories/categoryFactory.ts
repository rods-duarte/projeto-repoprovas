import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';

async function createCategory() {
  const name = faker.word.noun();
  const category = await prisma.category.create({
    data: {
      name,
    },
  });
  return category;
}

const categoryFactory = {
  createCategory,
};

export default categoryFactory;
