import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export interface FastifyInstanceToken extends FastifyInstance{
  authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
}

export interface TokenID {
  sub: string;
}
