import Joi from 'joi';
import { User } from '@prisma/client';

export type LoginData = Omit<User, 'id'>;

const LoginSchema = Joi.object<LoginData>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default LoginSchema;
