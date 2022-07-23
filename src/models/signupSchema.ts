import Joi from 'joi';
import { LoginData } from './loginSchema.js';

export type SignupData = LoginData & {
  confirmPassword: string;
};

const SignupSchema = Joi.object<SignupData>({
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref('password'),
}).with('confirmPassword', 'password');

export default SignupSchema;
