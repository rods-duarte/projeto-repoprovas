import { Router } from 'express';
import { createTest } from '../controllers/testController.js';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import CreateTestSchema from '../models/testSchema.js';

const testRouter = Router();

testRouter.post('/tests', validateSchema(CreateTestSchema), createTest);

export default testRouter;
