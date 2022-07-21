import { Request, Response } from 'express';
import { LoginData } from '../models/loginSchema';
import userService from '../services/userService.js';

export async function signup(req: Request, res: Response) {
  const credentials: LoginData = { ...req.body };
  await userService.create(credentials);
  res.status(201).send('Success');
}
