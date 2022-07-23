import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';
import termFactory from './termFactory.js';

async function createDiscipline() {
  const term = await termFactory.createTerm();
  const name = faker.word.noun();
  const discipline = await prisma.discipline.create({
    data: {
      name,
      termId: term.id,
    },
  });
  return discipline;
}

const disciplineFactory = {
  createDiscipline,
};

export default disciplineFactory;
