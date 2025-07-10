import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstanceToken, TokenID } from "types/fastify";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { RegisterDto } from "./user.dto";

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

export async function userRoutes(fastify: FastifyInstance) {
  const fastifyWithToken = fastify as FastifyInstanceToken;
  fastify.get(
    "/user/:id",
    {
      schema: {},
      onRequest: [fastifyWithToken.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { sub } = (await request.jwtDecode()) as TokenID;
      return await controller.getUserByEmail(sub, reply);
    }
  );

  fastify.post(
    "/register",
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
      request: FastifyRequest<{ Body: RegisterDto }>,
      reply: FastifyReply
    ) => {
      return await controller.createUser(request.body, reply);
    }
  );
}
