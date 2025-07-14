import fastifyPlugin from "fastify-plugin";
import z from "zod";

export const schemaConfig = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().default("3000"),
});


const configPlugin = fastifyPlugin(
  async (fastify) => {
    const parsed = schemaConfig.safeParse(process.env);
    if (!parsed.success) {
      fastify.log.error("Invalid environment variables");
      throw new Error("Invalid environment variables");
    }
    fastify.decorate("config", parsed.data);
  },
  { name: "config" }
);

export default configPlugin;
