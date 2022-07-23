import prisma from '../config/database.js';

async function selectByName(name: string) {
  const category = await prisma.category.findUnique({
    where: {
      name,
    },
  });
  return category;
}

const categoryRepository = {
  selectByName,
};

export default categoryRepository;
