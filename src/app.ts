import fastify from "fastify";

function appBuild() {
  const app = fastify({
    logger: true,
  });

  return app;
}
export default appBuild;
