import { FastifyReply } from "fastify";
import { IUserService } from "./user.interface";
import { RegisterDto } from "./user.dto";

export class UserController {
  constructor(private readonly userService: IUserService) {}

  async getUserByEmail(email: string, reply: FastifyReply) {
    const user = await this.userService.getUserByEmail(email);
    return reply.status(200).send({ status: "success", data: user });
  }

  async createUser(userData: RegisterDto, reply: FastifyReply) {
    const user = await this.userService.createUser(userData);
    return reply.status(201).send({ status: "success", data: user });
  }
}
