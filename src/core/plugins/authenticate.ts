import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

const authenticatePlugin = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    fastify.register(fastifyJwt, {
      secret: process.env.JWT_SECRET || "default_secret",
    });
    fastify.decorate(
      "authenticate",
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify();
        } catch (error) {
          return reply
            .status(401)
            .send({ message: "Token inválido ou expirado" });
        }
      }
    );
  },
  { name: "authenticate" }
);

export default authenticatePlugin;
