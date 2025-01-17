import { Request, Response, NextFunction } from "express";
const mongoose = require("mongoose");
import httpStatus from "http-status";
import config from "../config/config";
import { logger } from "../config/logger";
const ApiError = require("../utils/ApiError");

export const errorConverter = (
  err: typeof ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!error) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (
  err: typeof ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode = 500, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[statusCode as keyof typeof httpStatus];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === "production" && { stack: err.stack }),
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
