import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import prisma from '../../src/config/database.js';

interface Login {
  email: string;
  password: string;
}

function createLogin(email = 'teste@email.com', passwordLength = 10) {
  return {
    email,
    password: faker.internet.password(passwordLength),
  };
}

function createSignup(email = 'teste@email.com', passwordLength = 10) {
  const password = faker.internet.password(passwordLength);
  return {
    email,
    password,
    confirmPassword: password,
  };
}

async function createUser(login: Login) {
  const user = await prisma.user.create({
    data: {
      email: login.email,
      password: bcrypt.hashSync(login.password, 10),
    },
  });

  return { ...user, plainPassword: login.password };
}

async function findUser(login: Login) {
  const user = await prisma.user.findUnique({
    where: {
      email: login.email,
    },
  });

  return { ...user, plainPassword: login.password };
}

const UserFactory = {
  createLogin,
  createSignup,
  createUser,
  findUser,
};

export default UserFactory;
