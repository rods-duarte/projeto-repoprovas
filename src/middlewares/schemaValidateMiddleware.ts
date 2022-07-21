import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { unprocessableEntityError } from './errorHandlerMiddleware.js';

export default async function schemaValidate(schema: Schema) {
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
