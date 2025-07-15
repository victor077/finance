import { Prisma } from "@prisma/client";
import { IUserRepository, IUserService } from "./user.interface";
export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,

  ) {}

  async findUserByEmail(email: string) {
    const result = await this.userRepository.findByEmail(email);
    return {
      name: result?.name,
      email: result?.email,
    };
  }
  async updateUser(data: Prisma.UsuarioUpdateInput) {
    return this.userRepository.updateUser(data.id as string);
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }

}
