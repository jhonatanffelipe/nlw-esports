import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import AppError from "./AppError";

export default class ErrorHandler {
  public static handler(
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction
  ): any {
    console.log(err);
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    } else {
      return response.status(500).json({
        status: "Error",
        message: "Internal server error",
        err,
      });
    }
  }
}
