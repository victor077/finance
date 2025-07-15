import { FastifyReply } from "fastify";
import { IUserService } from "./user.interface";
import { registerUserSchema, RequestRegisterDto } from "./user.dto";
import { AppError } from "errors/appError";

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async findUserByEmail(email: string, reply: FastifyReply) {
    const user = await this.userService.findUserByEmail(email);
    return reply.status(200).send({ status: "success", data: user });
  }

  async createUser(token: string, reply: FastifyReply) {
    // const parsedUser = registerUserSchema.safeParse(userData);
    // if (!parsedUser.success) {
    //   return new AppError(
    //     "Erro de validação nos dados enviados.",
    //     400,
    //     parsedUser.error
    //   );
    // }
    const user = await this.userService.createUser(token);
    return reply.status(201).send({ status: "success", data: user });
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
    const pedingUser = await this.userService.createUserPending(userData);
    return reply.status(201).send({ status: "sucess", data: pedingUser });
  }
}
