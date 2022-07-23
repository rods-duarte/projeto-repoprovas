import prisma from '../config/database.js';

async function selectByName(name: string) {
  const category = await prisma.category.findUnique({
    where: {
      name,
    },
  });
  return category;
}

async function selectAll() {
  const categories = await prisma.category.findMany();
  return categories;
}

const categoryRepository = {
  selectByName,
  selectAll,
};

export default categoryRepository;
