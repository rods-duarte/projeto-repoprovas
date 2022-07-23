import { NextFunction, Request, Response } from "express";
import { unauthorizedError } from "./errorHandlerMiddleware.js";
import jwt from "jsonwebtoken";

export default function validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers?.authorization.replace('Bearer ', '').trim();
    if(!token) {
        const message = 'Missing token !';
        throw unauthorizedError(message);
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_KEY) as { userId: number};
        res.locals.userId = userId;
        next();
    } catch (err) {
        const message = 'Invalid token !';
        throw unauthorizedError(message);
    }
}