import prismaPlugin from "plugins/prisma";
import Fastify from "fastify";
import configPlugin from "plugins/config";
import swaggerPlugin from "plugins/swagger";
import jwtPlugin from "plugins/jwt";
import authenticatePlugin from "plugins/authenticate";
import { userRoutes } from "modules/user/user.routes";
import { handleError } from "errors/erroHandler";
import { authRoutes } from "modules/auth/auth.routes";

function appBuild() {
  const app = Fastify({
    logger: true,
  });
  app.setErrorHandler(handleError);
  app.register(configPlugin);
  app.register(swaggerPlugin, {
    dependencies: ["config"],
  });
  app.register(prismaPlugin, { dependencies: ["config"] });
  app.register(jwtPlugin, { dependencies: ["config"] });
  app.register(authenticatePlugin, { dependencies: ["jwt"] });
  app.register(userRoutes, { prefix: "api/" });
  app.register(authRoutes, { prefix: "api/auth" });

  return app;
}

export default appBuild;
