import { Router } from 'express';
import {
  createTest,
  getCategories,
  getTests,
} from '../controllers/testController.js';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import CreateTestSchema from '../models/testSchema.js';

const testRouter = Router();

testRouter.post('/tests', validateSchema(CreateTestSchema), createTest);
testRouter.get('/tests', getTests); // query string groupBy = <teachers|disciplines>
testRouter.get('/categories', getCategories);

export default testRouter;
