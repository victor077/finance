import { Prisma } from "@prisma/client";
import { IUserRepository, IUserService } from "./user.interface";
import { RegisterDto } from "./user.dto";
import bcrypt from "bcrypt";
import { AppError } from "core/errors/appError";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUserByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }

  async createUser(data: RegisterDto) {
    const studentExists = await this.userRepository.findByEmail(data.email);
    if (studentExists) {
      throw new AppError("User already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(data.password, 12);
    return this.userRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
  }

  async updateUser(id: string, data: Prisma.UsuarioUpdateInput) {
    return this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
