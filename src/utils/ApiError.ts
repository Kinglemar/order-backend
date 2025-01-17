interface CustomErrorOptions {
  name: string;
  message: string;
  statusCode: number;
  isOperational: boolean;
  stack: string;
}

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    stack: string
  ) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = ApiError