import { FastifyReply } from "fastify";
import { IUserService } from "./user.interface";
export class UserController {
  constructor(private readonly userService: IUserService) {}

  async findUserByEmail(email: string, reply: FastifyReply) {
    const user = await this.userService.findUserByEmail(email);
    return reply.status(200).send({ status: "success", data: user });
  }
}
