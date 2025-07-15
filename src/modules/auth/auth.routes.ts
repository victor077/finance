import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequestLoginDto, RequestRegisterDto } from "./auth.dto";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { FastifyInstanceToken } from "types/fastify";
import { EmailService } from "infra/email/email.service";

const repository = new AuthRepository();
const emailService = new EmailService();
const service = new AuthService(repository, emailService);
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
        tags: ["Auth"],
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
  fastify.post(
    "/register-pending",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
          },
          required: ["name", "email", "password"],
        },
        tags: ["Auth"],
      },
    },
    async (
      request: FastifyRequest<{ Body: RequestRegisterDto }>,
      reply: FastifyReply
    ) => {
      return await controller.createUserPending(request.body, reply);
    }
  );

  fastify.get(
    "/confirm",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
          required: ["token"],
        },
        tags: ["Auth"],
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { token } = request.query as { token: string };
      return await controller.createUser(token, reply);
    }
  );
}
