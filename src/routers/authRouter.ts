import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import LoginSchema from '../models/loginSchema.js';
import SignupSchema from '../models/signupSchema.js';
import {
  signup,
  signin,
  signinWithGithub,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(SignupSchema), signup);
authRouter.post('/sign-in', validateSchema(LoginSchema), signin);
authRouter.get('/sign-in/github', signinWithGithub);

export default authRouter;
