import categoryRepository from '../repositories/categoryRepository.js';

async function findAllCategories() {
  const categories = await categoryRepository.selectAll();
  return categories;
}
const categoryService = {
  findAllCategories,
};

export default categoryService;
