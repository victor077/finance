import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { AppError } from "core/errors/appError";

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
          throw new AppError("Token inválido ou expirado", 401);
        }
      }
    );
  },
  { name: "authenticate" }
);

export default authenticatePlugin;
