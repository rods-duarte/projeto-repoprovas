import { Router } from 'express';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import SignUpSchema from '../models/signUpSchema.js';
import { signup } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(SignUpSchema), signup);
authRouter.post('/signin');

export default authRouter;
