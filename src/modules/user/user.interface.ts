import { Prisma, RegistroPendente, Usuario } from "@prisma/client";
import {
  RegisterUserPeding,
  RequestRegisterDto,
  ResponseRegistrationPeding,
  ResponseUserDto,
  UpdateUserDto,
  UserResponseDto,
} from "./user.dto";

export interface IUserRepository {
  findByEmail(email: string): Promise<Usuario | null>;
  createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
  updateUser(id: string): Promise<Usuario>;
  deleteUser(id: string): Promise<Usuario>;
  createUserPending(
    data: Prisma.RegistroPendenteCreateInput
  ): Promise<RegistroPendente>;
  findPendingRegistration(email: string): Promise<RegistroPendente | null>;
  deletePedingRegistration(id: number): Promise<RegistroPendente | null>;
}

export interface IUserService {
  findUserByEmail(email: string): Promise<UserResponseDto | null>;
  createUser(data: RequestRegisterDto): Promise<ResponseUserDto | null>;
  updateUser(data: UpdateUserDto): Promise<UserResponseDto | null>;
  deleteUser(id: string): Promise<Usuario | null>;
  createUserPending(
    data: RegisterUserPeding
  ): Promise<ResponseRegistrationPeding | null>;
}
