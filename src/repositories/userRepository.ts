import prisma from '../config/database.js';
import { LoginData } from '../models/loginSchema.js';

async function insert(data: LoginData) {
  await prisma.user.create({
    data,
  });
}

async function select(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

const UserRepository = {
  insert,
  select,
};

export default UserRepository;
