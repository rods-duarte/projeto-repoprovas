import { Router } from 'express';
import {
  createTest,
  getCategories,
  getTests,
} from '../controllers/testController.js';
import validateSchema from '../middlewares/schemaValidateMiddleware.js';
import CreateTestSchema from '../models/testSchema.js';
import validateToken from '../middlewares/tokenValidateMiddleware.js';

const testRouter = Router();

testRouter.post(
  '/tests',
  validateToken,
  validateSchema(CreateTestSchema),
  createTest
);
testRouter.get('/tests', validateToken, getTests); // query string groupBy = <teachers|disciplines>
testRouter.get('/categories', validateToken, getCategories);

export default testRouter;
