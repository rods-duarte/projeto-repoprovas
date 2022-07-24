import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

function generateToken() {
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60, // one day in sec
  });
  return `Bearer ${token}`;
}

async function createUser(login: Login) {
  const user = await prisma.user.create({
    data: {
      email: login.email,
      password: bcrypt.hashSync(login.password, 10),
    },
  });
  const token = generateToken();

  return { ...user, plainPassword: login.password, token };
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
  generateToken,
};

export default UserFactory;
