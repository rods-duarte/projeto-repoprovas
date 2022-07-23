import prisma from '../config/database.js';

async function selectByName(name: string) {
  const teacher = await prisma.teacher.findFirst({
    where: {
      name,
    },
  });

  return teacher;
}

async function selectTeacherDiscipline(name: string, discipline: string) {
  const disciplines = await prisma.$queryRaw`
        SELECT d.name as discipline, td.id FROM TEACHERS t
        JOIN "teachersDisciplines" td ON t.id = td."teacherId"
        JOIN DISCIPLINES d ON td."disciplineId" = d.id
        WHERE t.name = ${name} AND d.name = ${discipline}
  `;

  return disciplines[0];
}

const teacherRepository = {
  selectByName,
  selectTeacherDiscipline,
};

export default teacherRepository;
