import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstanceToken } from "types/fastify";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

export async function userRoutes(fastify: FastifyInstance) {
  const fastifyWithToken = fastify as FastifyInstanceToken;
  fastify.get<{ Params: { email: string } }>(
    "/user/:email",
    {
      schema: {
        tags: ["User"],
      },
      onRequest: [fastifyWithToken.authenticate],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      // const { email } = request.params as { email: string };
      // return await controller.findUserByEmail(email, reply);
      return "Rota feita para teste de funcionalidade do token";
    }
  );
}
