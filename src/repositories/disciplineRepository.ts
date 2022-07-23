import prisma from '../config/database.js';

async function selectByName(name: string) {
  const discipline = await prisma.discipline.findFirst({
    where: {
      name,
    },
  });

  return discipline;
}

const disciplineRepository = {
  selectByName,
};

export default disciplineRepository;
