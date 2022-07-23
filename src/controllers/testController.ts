import { Request, Response } from 'express';
import { CreateTest } from '../models/testSchema.js';
import categoryService from '../services/categoryService.js';
import testService from '../services/testService.js';

export async function getTests(req: Request, res: Response) {
  const groupBy: any = req.query.groupBy;
  const tests = await testService.findTests(groupBy);
  res.send({ tests });
}

export async function createTest(req: Request, res: Response) {
  const newTest: CreateTest = req.body;
  await testService.createTest(newTest);
  res.status(201).send('success');
}

export async function getCategories(req: Request, res: Response) {
  const categories = await categoryService.findAllCategories();
  res.status(200).send({ categories });
}
