import { FastifyReply } from "fastify";
import { RequestLoginDto, ResponseLoginDto } from "./auth.dto";
import { IAuthService } from "./auth.interface";
import { FastifyInstanceToken } from "types/fastify";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async login(
    data: RequestLoginDto,
    app: FastifyInstanceToken,
    reply: FastifyReply
  ): Promise<ResponseLoginDto> {
    const result = await this.authService.login(data);
    const token = app.jwt.sign({
      id: result.id,
      email: result.email,
      name: result.name,
    });
    return reply.status(201).send({ status: "success", data: result, token });
  }
}
