import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./appError";

export function handleError(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof AppError) {
    return reply
      .status(error.statusCode || 500)
      .send({ success: false, message: error.message });
  }

  console.error(error);

  return reply.status(500).send({
    success: false,
    message: "Internal server error",
  });
}
