import { ErrorRequestHandler } from 'express';

const ErrorToStatusCode = {
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  unprocessableEntity: 422,
};

export function unauthorizedError(message: string) {
  return { type: 'unauthorized', message };
}

export function forbiddenError(message: string) {
  return { type: 'forbidden', message };
}

export function notFoundError(message: string) {
  return { type: 'notFound', message };
}

export function conflictError(message: string) {
  return { type: 'conflict', message };
}

export function unprocessableEntityError(message: string) {
  return { type: 'unprocessableEntity', message };
}

// eslint-disable-next-line
const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const { type, message }: { type: string; message: string } = error;
  if (type) {
    return res.status(ErrorToStatusCode[type]).send(message);
  }

  return res.status(500).send('Internal server error !');
};

export default errorHandler;
