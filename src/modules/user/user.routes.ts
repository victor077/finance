import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstanceToken, TokenID } from "types/fastify";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { RequestRegisterDto } from "./user.dto";
import { EmailService } from "infra/email/email.service";

const repository = new UserRepository();
const emailService = new EmailService();
const service = new UserService(repository, emailService);
const controller = new UserController(service);

export async function userRoutes(fastify: FastifyInstance) {
  const fastifyWithToken = fastify as FastifyInstanceToken;
  fastify.get<{ Params: { email: string } }>(
    "/user/:email",
    {
      schema: {},
      onRequest: [fastifyWithToken.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email } = request.params as { email: string };
      return await controller.findUserByEmail(email, reply);
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
      },
    },
    async (
      request: FastifyRequest<{ Body: RequestRegisterDto }>,
      reply: FastifyReply
    ) => {
      return await controller.createUserPending(request.body, reply);
    }
  );
}
