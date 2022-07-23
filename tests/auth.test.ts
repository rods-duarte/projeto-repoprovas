import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import app from '../src/app.js';
import UserFactory from './factories/userFactory.js';
import prisma from '../src/config/database.js';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE USERS CASCADE`;
});

describe('signup test suit', () => {
  it('given email & password expect create user', async () => {
    const signup = UserFactory.createSignup();
    const response = await supertest(app).post('/sign-up').send(signup);
    expect(response.status).toBe(201);

    const userCreated = await UserFactory.findUser(signup);
    expect(userCreated.email).toBe(signup.email);
  });

  it('given invalid input expect 422', async () => {
    const signup = UserFactory.createSignup();
    signup.email = '';

    const response = await supertest(app).post('/sign-up').send(signup);
    expect(response.status).toBe(422);
  });

  it('given different password and confirm password expect 422', async () => {
    const signup = UserFactory.createSignup();
    signup.confirmPassword = faker.internet.password();

    const response = await supertest(app).post('/sign-up').send(signup);
    expect(response.status).toBe(422);
  });

  it('given email in use fail to create user, expect 401', async () => {
    const login = UserFactory.createLogin('teste@email.com');
    await UserFactory.createUser(login);
    const secondLogin = UserFactory.createLogin('teste@email.com');

    const response = await supertest(app).post('/sign-up').send(secondLogin);
    expect(response.status).toBe(401);
  });
});

describe('signin test suit', () => {
  it('given login expect 200, return token', async () => {
    const login = UserFactory.createLogin();
    await UserFactory.createUser(login);

    const response = await supertest(app).post('/sign-in').send(login);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('given not registered account expect 401', async () => {
    const login = UserFactory.createLogin();

    const response = await supertest(app).post('/sign-in').send(login);
    expect(response.status).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });

  it('given wrong password expect 401', async () => {
    const login = UserFactory.createLogin();
    await UserFactory.createUser(login);

    const response = await supertest(app)
      .post('/sign-in')
      .send({ email: login.email, password: '123' });

    expect(response.status).toBe(401);
    expect(response.body).not.toHaveProperty('token');
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
