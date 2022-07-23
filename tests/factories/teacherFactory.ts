import { faker } from '@faker-js/faker';
import { Discipline, Teacher } from '@prisma/client';
import prisma from '../../src/config/database.js';

async function createTeacher() {
  const name = faker.name.findName();
  const teacher = await prisma.teacher.create({
    data: {
      name,
    },
  });
  return teacher;
}

async function createTeacherDiscipline(teacher: Teacher, discipline: Discipline) {
  await prisma.teacherDiscipline.create({
    data: {
      disciplineId: discipline.id,
      teacherId: teacher.id
    }
  })
}

const teacherFactory = {
  createTeacher,
  createTeacherDiscipline
};

export default teacherFactory;
