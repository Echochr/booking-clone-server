import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: CustomError, _req: Request, res: Response, _next: NextFunction) {
  return res.status(err.statusCode || 500).json({
    name: err.name,
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong',
    stack: err.stack,
  });
}

export default errorHandler;
