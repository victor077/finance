import { Usuario } from "@prisma/client";
import { UpdateUserDto, UserResponseDto } from "./user.dto";

export interface IUserRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  updateUser(id: string): Promise<Usuario>;
  deleteUser(id: string): Promise<Usuario>;
}

export interface IUserService {
  findUserByEmail(email: string): Promise<UserResponseDto | null>;
  updateUser(data: UpdateUserDto): Promise<UserResponseDto | null>;
  deleteUser(id: string): Promise<Usuario | null>;
}
