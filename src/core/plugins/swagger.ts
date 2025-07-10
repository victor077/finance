import fastifyPlugin from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

const swaggerPlugin = fastifyPlugin(
  async (fastify: FastifyInstance) => {
    await fastify.register(fastifySwagger, {
      mode: "dynamic",
      openapi: {
        info: {
          title: "API",
          version: "1.0.0",
          description: "Documentação da API com autenticação JWT",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    });

    await fastify.register(fastifySwaggerUI, {
      routePrefix: "/api/docs",
      initOAuth: {},
      uiConfig: {
        docExpansion: "full",
        deepLinking: false,
      },
      staticCSP: true,
    });
  },
  { name: "swagger", dependencies: ["config"] }
);

export default swaggerPlugin;
