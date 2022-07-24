import prisma from '../config/database.js';

interface InsertTestData {
  name: string;
  pdfUrl: string;
  categoryId: number;
  teacherDisciplineId: number;
}

async function selectTestsByDisciplines() {
  const tests = await prisma.term.findMany({
    include: {
      disciplines: {
        include: {
          teacherDisciplines: {
            include: {
              discipline: {
                include: {
                  term: {},
                },
              },
              teacher: {},
              tests: {
                include: {
                  category: {},
                },
              },
            },
            where: {
              tests: {
                some: {},
              },
            },
          },
          term: {},
        },
      },
    },
  });

  return tests;
}

async function selectTestsByTeachers() {
  const tests = await prisma.teacherDiscipline.findMany({
    include: {
      discipline: {
        include: {
          term: {},
        },
      },
      teacher: {},
      tests: {
        include: {
          category: {},
        },
      },
    },
  });

  return tests;
}

async function insert(data: InsertTestData) {
  await prisma.test.create({
    data,
  });
}

const testRepository = {
  insert,
  selectTestsByDisciplines,
  selectTestsByTeachers,
};

export default testRepository;
