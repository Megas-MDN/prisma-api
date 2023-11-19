import { NextFunction, Request, Response } from 'express';
export const errorHandler = (
  error: { status: number; message: string },
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  return res
    .status(error.status || 500)
    .send({ message: error.message || 'Internal server error' });
};
