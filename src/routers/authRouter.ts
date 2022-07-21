import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import LoginSchema from '../models/loginSchema.js';
import { signup, signin } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(LoginSchema), signup);
authRouter.post('/signin', validateSchema(LoginSchema), signin);

export default authRouter;
