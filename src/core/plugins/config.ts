import fastifyPlugin from "fastify-plugin";
import z from "zod";

const schema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().default("3000"),
});

declare module "fastify" {
  interface FastifyInstance {
    config: z.infer<typeof schema>;
  }
}

const configPlugin = fastifyPlugin(
  async (fastify) => {
    const parsed = schema.safeParse(process.env);
    if (!parsed.success) {
      fastify.log.error("Invalid environment variables");
      throw new Error("Invalid environment variables");
    }
    fastify.decorate("config", parsed.data);
  },
  { name: "config" }
);

export default configPlugin;
