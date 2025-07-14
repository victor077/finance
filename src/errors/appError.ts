import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
    public readonly details?: ZodError
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}
