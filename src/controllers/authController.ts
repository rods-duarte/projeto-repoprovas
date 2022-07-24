import { Request, Response } from 'express';
import { unauthorizedError } from '../middlewares/errorHandlerMiddleware.js';
import { LoginData } from '../models/loginSchema';
import { SignupData } from '../models/signupSchema';
import userService from '../services/userService.js';

export async function signup(req: Request, res: Response) {
  const credentials: SignupData = { ...req.body };
  await userService.createUser(credentials);
  res.status(201).send('Success');
}

export async function signin(req: Request, res: Response) {
  const credentials: LoginData = req.body;
  const token = await userService.login(credentials);
  res.status(200).send({ token });
}

export async function signinWithGithub(req: Request, res: Response) {
  const code = req.query.code;
  const path = req.query.path;

  if (!code) {
    const message = 'Missing github code !';
    throw unauthorizedError(message);
  }

  const githubUser = await userService.getGithubUser(code.toString());
  const token = await userService.loginWithGithub(githubUser);

  res.redirect(`${path}?token=${token}`);
}
