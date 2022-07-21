import Joi from 'joi';
import { User } from '@prisma/client';

export type SignUpData = Omit<User, 'id'>;

const SignUpSchema = Joi.object<SignUpData>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default SignUpSchema;
