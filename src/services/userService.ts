import bcrypt from 'bcrypt';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import { SignUpData } from '../models/signUpSchema.js';
import UserRepository from '../repositories/userRepository.js';

async function create(credentials: SignUpData) {
  const userExists = await UserRepository.select(credentials.email);

  if (userExists) {
    const message = 'Wrong email & password combination !';
    throw unauthorizedError(message);
  }

  const cryptedPassword = bcrypt.hashSync(credentials.password, 10);
  await UserRepository.insert({
    email: credentials.email,
    password: cryptedPassword,
  });
}

const userService = {
  create,
};

export default userService;
