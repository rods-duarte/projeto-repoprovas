import prisma from '../config/database.js';

interface InsertTestData {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
}

async function insert(data: InsertTestData) {
  await prisma.test.create({
    data,
  });
}

const testRepository = {
  insert,
};

export default testRepository;
