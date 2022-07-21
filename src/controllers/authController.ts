import { Request, Response } from 'express';
import { SignUpData } from '../models/signUpSchema';
import userService from '../services/userService.js';

export async function signup(req: Request, res: Response) {
  const credentials: SignUpData = { ...req.body };
  await userService.create(credentials);
  res.status(201).send('Success');
}
