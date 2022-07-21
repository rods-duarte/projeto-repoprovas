import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { unprocessableEntityError } from './errorHandlerMiddleware.js';

export default function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = schema.validate(body);
    const valid = error == null;

    if (!valid) {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      throw unprocessableEntityError(message);
    }

    next();
  };
}
