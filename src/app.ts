import prismaPlugin from "core/plugins/prisma";
import Fastify from "fastify";
import configPlugin from "core/plugins/config";
import swaggerPlugin from "core/plugins/swagger";
import jwtPlugin from "core/plugins/jwt";
import authenticatePlugin from "core/plugins/authenticate";
import { userRoutes } from "modules/user/user.routes";

function appBuild() {
  const app = Fastify({
    logger: true,
  });

  app.register(configPlugin);
  app.register(swaggerPlugin, {
    dependencies: ["config"],
  });
  app.register(prismaPlugin, { dependencies: ["config"] });
  app.register(jwtPlugin, { dependencies: ["config"] });
  app.register(authenticatePlugin, { dependencies: ["jwt"] });
  app.register(userRoutes, { prefix: "api/" });

  return app;
}

export default appBuild;
