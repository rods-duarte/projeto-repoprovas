import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import LoginSchema from '../models/loginSchema.js';
import SignupSchema from '../models/signupSchema.js';
import { signup, signin } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(SignupSchema), signup);
authRouter.post('/sign-in', validateSchema(LoginSchema), signin);

export default authRouter;
