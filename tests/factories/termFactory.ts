import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';

async function createTerm() {
  const term = await prisma.term.create({
    data: {
      number: Number(faker.random.numeric()),
    },
  });
  return term;
}

const termFactory = {
  createTerm,
};

export default termFactory;
