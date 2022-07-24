import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import app from '../src/app.js';
import prisma from '../src/config/database.js';
import testFactory from './factories/testFactory.js';
import UserFactory from './factories/userFactory.js';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE USERS`;
  await prisma.$executeRaw`TRUNCATE TABLE TESTS`;
  await prisma.$executeRaw`TRUNCATE TABLE CATEGORIES CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "teachersDisciplines" CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE TEACHERS CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE DISCIPLINES CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE TERMS CASCADE`;
});

describe('post /test test suit', () => {
  it('should create new test, expect 201', async () => {
    const token = UserFactory.generateToken();
    const newTest = await testFactory.createTestData();

    const response = await supertest(app)
      .post('/tests')
      .send(newTest)
      .set('Authorization', token);
    expect(response.status).toBe(201);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).not.toBe(null);
  });

  it('given not regitered category should return 404', async () => {
    const token = UserFactory.generateToken();
    const newTest = await testFactory.createTestData();
    newTest.category = faker.random.word();

    const response = await supertest(app)
      .post('/tests')
      .send(newTest)
      .set('Authorization', token);
    expect(response.status).toBe(404);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).toBe(null);
  });

  it('given not registered teacher should return 404', async () => {
    const token = UserFactory.generateToken();
    const newTest = await testFactory.createTestData();
    newTest.teacher = faker.random.word();

    const response = await supertest(app)
      .post('/tests')
      .send(newTest)
      .set('Authorization', token);
    expect(response.status).toBe(404);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).toBe(null);
  });

  it('given not regitered discipline should return 404', async () => {
    const token = UserFactory.generateToken();
    const newTest = await testFactory.createTestData();
    newTest.discipline = faker.random.word();

    const response = await supertest(app)
      .post('/tests')
      .send(newTest)
      .set('Authorization', token);
    expect(response.status).toBe(404);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).toBe(null);
  });

  it('missing test name should return 422', async () => {
    const token = UserFactory.generateToken();
    const newTest = await testFactory.createTestData();
    newTest.name = '';

    const response = await supertest(app)
      .post('/tests')
      .send(newTest)
      .set('Authorization', token);
    expect(response.status).toBe(422);

    const testOnDb = await testFactory.findTest(newTest);
    expect(testOnDb).toBe(null);
  });

  it('missing valid token should return 401', async () => {
    const token = 'invalidtoken';
    const newTest = await testFactory.createTestData();

    const response = await supertest(app)
      .post('/tests')
      .send(newTest)
      .set('Authorization', token);
    expect(response.status).toBe(401);
  });
});

describe('get /tests test suit', () => {
  it('given groupBy = disciplines should return ordened by discipline, expect 200', async () => {
    const token = UserFactory.generateToken();
    await testFactory.createTestData();
    const response = await supertest(app)
      .get('/tests?groupBy=disciplines')
      .set('Authorization', token);
    expect(response.status).toBe(200);
    expect(response.body.tests.discipline).not.toBe(null);
  });

  it('given groupBy = teachers should return ordened by teachers, expect 200', async () => {
    const token = UserFactory.generateToken();
    await testFactory.createTestData();
    const response = await supertest(app)
      .get('/tests?groupBy=teachers')
      .set('Authorization', token);
    expect(response.status).toBe(200);
    expect(response.body.tests).not.toBe(null);
  });

  it('given no groupBy should throw error, expect 400', async () => {
    const token = UserFactory.generateToken();
    await testFactory.createTestData();
    const response = await supertest(app)
      .get('/tests')
      .set('Authorization', token);
    expect(response.status).toBe(400);
    expect(response.body.tests).toBe(undefined);
  });

  it('missing valid token should throw error, expect 401', async () => {
    const token = 'invalidtoken';
    await testFactory.createTestData();
    const response = await supertest(app)
      .get('/tests?groupBy=disciplines')
      .set('Authorization', token);
    expect(response.status).toBe(401);
    expect(response.body.tests).toBe(undefined);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
