import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException } from '../exceptions/http.exceptions';
import { config } from '../config';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof HttpException) {
        return res.status(error.status).json({
            status: 'error',
            statusCode: error.status,
            message: error.message
        });
    }

    // Log unexpected errors
    console.error(error);

    // Don't expose internal errors in production
    const message = config.env === 'production' 
        ? 'Internal server error' 
        : error.message;

    return res.status(500).json({
        status: 'error',
        statusCode: 500,
        message
    });
};