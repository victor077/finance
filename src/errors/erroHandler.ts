import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./appError";
import { ZodError } from "zod";

export function handleError(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof AppError) {
    if (error.details instanceof ZodError) {
      return reply.status(error.statusCode || 400).send({
        success: false,
        message: error.message,
        errors: error.details.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    return reply
      .status(error.statusCode || 400)
      .send({ success: false, message: error.message });
  }

  console.error(error);

  return reply.status(500).send({
    success: false,
    message: "Internal server error",
  });
}
