import { PrismaClient } from "@prisma/client";
import fastifyPlugin from "fastify-plugin";
import { FastifyInstance } from "fastify/types/instance";


export const prisma = new PrismaClient();
const prismaPlugin = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    try {
      await prisma.$connect();
      fastify.log.info("Prisma client connected successfully");
    } catch (error) {
      fastify.log.error("Failed to connect to Prisma client", error);
      throw error;
    }
    fastify.addHook("onClose", async () => {
      await prisma.$disconnect();
      fastify.log.info("Prisma client disconnected");
    });
  },
  {
    name: "prisma",
    dependencies: ["config"],
  }
);

export default prismaPlugin;