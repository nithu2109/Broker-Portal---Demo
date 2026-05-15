import { Request, Response, NextFunction } from "express";
// import { InvalidTokenError } from "express-oauth2-jwt-bearer";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = (err as any).statusCode || (err.name === 'UnauthorizedError' ? 401 : 500);
  
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack, error: err })
  });
};
