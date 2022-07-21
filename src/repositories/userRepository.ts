import prisma from '../config/database.js';
import { SignUpData } from '../models/signUpSchema.js';

async function insert(data: SignUpData) {
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
