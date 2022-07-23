import { Request, Response } from 'express';
import { CreateTest } from '../models/testSchema.js';
import testService from '../services/testService.js';

export async function createTest(req: Request, res: Response) {
  const newTest: CreateTest = req.body;
  await testService.createTest(newTest);
  res.status(201).send('success');
}
