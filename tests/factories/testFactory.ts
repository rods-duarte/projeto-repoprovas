import prisma from "../../src/config/database.js";
import { faker } from "@faker-js/faker";
import categoryFactory from "./categoryFactory.js";
import teacherFactory from "./teacherFactory.js";
import disciplineFactory from "./disciplineFactory.js";
import { CreateTest } from "../../src/models/testSchema.js";

async function createTestData() {
    const category = await categoryFactory.createCategory();
    const teacher = await teacherFactory.createTeacher();
    const discipline = await disciplineFactory.createDiscipline();
    await teacherFactory.createTeacherDiscipline(teacher, discipline);
    const testData: CreateTest = {
      name: faker.name.firstName(),
      pdfUrl: faker.internet.url(),
      category: category.name,
      teacher: teacher.name,
      discipline: discipline.name,
    };
    return testData;
}

async function findTest(newTestData: CreateTest) {
    const test = await prisma.test.findFirst({
        where: {
            name: newTestData.name,
            pdfUrl: newTestData.pdfUrl,
        }
    })
    return test;
}

const testFactory = {
    createTestData,
    findTest
}

export default testFactory;