import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import app from '../src/app.js';
import prisma from '../src/config/database.js';
import testFactory from './factories/testFactory.js';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE TESTS`;
  await prisma.$executeRaw`TRUNCATE TABLE CATEGORIES CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE TEACHERS CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE DISCIPLINES CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE TERMS CASCADE`;
});

describe('post /test suit', () => {
  it('should create new test, expect 201', async () => {
    const newTest = await testFactory.createTestData();

    const response = await supertest(app).post('/tests').send(newTest);
    expect(response.status).toBe(201);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).not.toBe(null);
  });

  it('given not regitered category should return 404', async () => {
    const newTest = await testFactory.createTestData();
    newTest.category = faker.random.word();

    const response = await supertest(app).post('/tests').send(newTest);
    expect(response.status).toBe(404);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).toBe(null);
  });

  it('given not registered teacher should return 404', async () => {
    const newTest = await testFactory.createTestData();
    newTest.teacher = faker.random.word();

    const response = await supertest(app).post('/tests').send(newTest);
    expect(response.status).toBe(404);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).toBe(null);
  });

  it('given not regitered discipline should return 404', async () => {
    const newTest = await testFactory.createTestData();
    newTest.discipline = faker.random.word();

    const response = await supertest(app).post('/tests').send(newTest);
    expect(response.status).toBe(404);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).toBe(null);
  });

  it('missing test name should return 422', async () => {
    const newTest = await testFactory.createTestData();
    newTest.name = '';

    const response = await supertest(app).post('/tests').send(newTest);
    expect(response.status).toBe(422);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).toBe(null);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
