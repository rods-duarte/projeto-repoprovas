import supertest from 'supertest';
import app from '../src/app.js';
import UserFactory from './factories/userFactory.js';
import prisma from '../src/config/database.js';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE USERS`;
});

describe('signup suit', () => {
  it('given email & password expect create user', async () => {
    const login = UserFactory.createLogin();
    const response = await supertest(app).post('/signup').send(login);
    expect(response.status).toBe(201);

    const userCreated = await UserFactory.findUser(login);
    expect(userCreated.email).toBe(login.email);
  });

  it('given invalid input expect 422', async () => {
    const login = UserFactory.createLogin();
    delete login.password;

    const response = await supertest(app).post('/signup').send(login);
    expect(response.status).toBe(422);
  });

  it('given email in use fail to create user, expect 409', async () => {
    const login = UserFactory.createLogin('teste@email.com');
    await UserFactory.createUser(login);

    const secondLogin = UserFactory.createLogin('teste@email.com');
    const response = await supertest(app).post('/signup').send(secondLogin);
    expect(response.status).toBe(409);
  });
});
