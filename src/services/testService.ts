import { Teacher } from '@prisma/client';
import { notFoundError } from '../middlewares/errorHandlerMiddleware.js';
import { CreateTest } from '../models/testSchema.js';
import categoryRepository from '../repositories/categoryRepository.js';
import teacherRepository from '../repositories/teacherRepository.js';
import testRepository from '../repositories/testRepository.js';
// async function findTests(criteria: string) {}

async function validateNewTestCategory(categoryName: string) {
  const category = await categoryRepository.selectByName(categoryName);

  if (!category) {
    const message = 'Category not found !';
    throw notFoundError(message);
  }

  return category.id;
}

async function validateNewTestTeacherAndDiscipline(
  teacherName: string,
  disciplineName: string
) {
  const teacher: Teacher = await teacherRepository.selectByName(teacherName);
  if (!teacher) {
    const message = 'Teacher not found !';
    throw notFoundError(message);
  }

  const teacherDiscipline: { discipline: string; id: number } | null =
    await teacherRepository.selectTeacherDiscipline(
      teacherName,
      disciplineName
    );

  if (!teacherDiscipline) {
    const message = `Teacher ${teacherName} is not from ${disciplineName}`;
    throw notFoundError(message);
  }

  return teacherDiscipline.id;
}

async function createTest(data: CreateTest) {
  const categoryId = await validateNewTestCategory(data.category);
  const teacherDisciplineId = await validateNewTestTeacherAndDiscipline(
    data.teacher,
    data.discipline
  );

  const insertData = { ...data, categoryId, teacherDisciplineId };
  delete insertData.category;
  delete insertData.discipline;
  delete insertData.teacher;

  await testRepository.insert(insertData);
}

async function findTests(criteria: string) {
  if (criteria === 'disciplines') {
    return testRepository.selectTestsByDisciplines();
  }

  return null;
}

const testService = {
  createTest,
  findTests,
};

export default testService;
