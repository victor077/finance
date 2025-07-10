import prismaPlugin from "core/plugins/prisma";
import Fastify from "fastify";
import configPlugin from "core/plugins/config";
import swaggerPlugin from "core/plugins/swagger";

function appBuild() {
  const app = Fastify({
    logger: true,
  });

  app.register(configPlugin);
  app.register(swaggerPlugin, {
    dependencies: ["config"],
  });
  app.register(prismaPlugin, { dependencies: ["config"] });
  // app.register(jwtPlugin);
  // app.register(authenticatePlugin);
  // app.register(authRoutes, { prefix: "api/" });
  // app.register(studentRoutes, { prefix: "api/" });
  // app.register(financeRoutes, { prefix: "api/" });

  return app;
}

export default appBuild;
