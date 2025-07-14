import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";

const jwtPlugin = fastifyPlugin(async (fastify: FastifyInstance) => {
  fastify.decorate("signToken", (payload: object): string => {
    return fastify.jwt.sign(payload, { expiresIn: "5m" });
  });
});

export default jwtPlugin;
