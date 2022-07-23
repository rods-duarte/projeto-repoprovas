import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import { LoginData } from '../models/loginSchema.js';
import { SignupData } from '../models/signupSchema.js';
import UserRepository from '../repositories/userRepository.js';

async function createUser(credentials: SignupData) {
  const userExists = await UserRepository.select(credentials.email);

  if (userExists) {
    const message = 'Email already registered !';
    throw unauthorizedError(message);
  }

  const cryptedPassword = bcrypt.hashSync(credentials.password, 10);
  await UserRepository.insert({
    email: credentials.email,
    password: cryptedPassword,
  });
}

async function findUser(email: string) {
  const user = await UserRepository.select(email);
  return user;
}

async function getUserOrFail(credentials: LoginData) {
  const { email, password } = credentials;
  const user = await UserRepository.select(email);

  if (!user) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }
  const valid = bcrypt.compareSync(password, user.password);

  if (!valid) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }

  return user;
}

async function login(credentials: LoginData) {
  const user = await getUserOrFail(credentials);
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return token;
}

const userService = {
  createUser,
  findUser,
  login,
};

export default userService;
