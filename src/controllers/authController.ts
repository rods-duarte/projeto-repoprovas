import { Request, Response } from 'express';
import { LoginData } from '../models/loginSchema';
import userService from '../services/userService.js';

export async function signup(req: Request, res: Response) {
  const credentials: LoginData = { ...req.body };
  await userService.createUser(credentials);
  res.status(201).send('Success');
}

export async function signin(req: Request, res: Response) {
  const credentials: LoginData = req.body;
  const token = await userService.login(credentials);
  res.status(200).send({ token });
}
