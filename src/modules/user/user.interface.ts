import { Prisma, Usuario } from "@prisma/client";
import {
  RegisterDto,
  ResponseUserDto,
  UpdateUserDto,
  UserResponseDto,
} from "./user.dto";

export interface IUserRepository {
  findByEmail(email: string): Promise<Omit<Usuario, "password">>;
  createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
  updateUser(id: string, data: Prisma.UsuarioUpdateInput): Promise<Usuario>;
  deleteUser(id: string): Promise<Usuario>;
}

export interface IUserService {
  getUserByEmail(email: string): Promise<UserResponseDto>;
  createUser(data: RegisterDto): Promise<ResponseUserDto>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserResponseDto>;
  deleteUser(id: string): Promise<Usuario>;
}
