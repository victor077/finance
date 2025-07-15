import { Prisma, RegistroPendente, Usuario } from "@prisma/client";
import { RegisterUserPeding, RequestLoginDto, ResponseLoginDto, ResponseRegistrationPeding, UserResponseDto } from "./auth.dto";

export interface IAuthRepostory {
  findByEmail(email: string): Promise<Usuario | null>;
  createUserPending(
    data: Prisma.RegistroPendenteCreateInput
  ): Promise<RegistroPendente>;
  findPendingRegistrationByEmail(
    email: string
  ): Promise<RegistroPendente | null>;
  deletePedingRegistration(id: number): Promise<RegistroPendente | null>;
  findPedingRegistrationByToken(
    token: string
  ): Promise<RegistroPendente | null>;
  createUser(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
}

export interface IAuthService {
  login(data: RequestLoginDto): Promise<ResponseLoginDto>;
  createUserPending(
    data: RegisterUserPeding
  ): Promise<ResponseRegistrationPeding | null>;
  createUser(data: string): Promise<UserResponseDto | null>;
}
