import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorizedError } from './errorHandlerMiddleware.js';

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace('Bearer ', '').trim();
  if (!token) {
    const message = 'Missing token !';
    throw unauthorizedError(message);
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };
    res.locals.userId = userId;
    next();
  } catch (err) {
    const message = 'Invalid token !';
    throw unauthorizedError(message);
  }
}
