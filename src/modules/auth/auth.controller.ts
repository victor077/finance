import { FastifyReply } from "fastify";
import { registerUserSchema, RequestLoginDto, RequestRegisterDto, ResponseLoginDto } from "./auth.dto";
import { IAuthService } from "./auth.interface";
import { FastifyInstanceToken } from "types/fastify";
import { AppError } from "errors/appError";

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
  async createUserPending(userData: RequestRegisterDto, reply: FastifyReply) {
    const parsedUser = registerUserSchema.safeParse(userData);
    if (!parsedUser.success) {
      return new AppError(
        "Erro de validação nos dados enviados.",
        400,
        parsedUser.error
      );
    }
    const pedingUser = await this.authService.createUserPending(userData);
    return reply.status(201).send({ status: "sucess", data: pedingUser });
  }

  async createUser(token: string, reply: FastifyReply) {
    const user = await this.authService.createUser(token);
    return reply.status(201).send({ status: "success", data: user });
  }
}
