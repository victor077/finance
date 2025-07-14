import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestLoginDto } from "./auth.dto";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { FastifyInstanceToken } from "types/fastify";

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
          required: ["email", "password"],
        },
      },
    },
    async (
      request: FastifyRequest<{ Body: RequestLoginDto }>,
      reply: FastifyReply
    ) => {
      return controller.login(
        request.body,
        fastify as FastifyInstanceToken,
        reply
      );
    }
  );
}
