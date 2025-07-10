import { Prisma, Usuario } from "@prisma/client";
import { LoginDto, ResponseLoginDto } from "./auth.dto";

export interface IAuthRepostory {
  findByEmail(email: string): Promise<Usuario | null>;
}

export interface IAuthService {
  login(data: LoginDto): Promise<ResponseLoginDto>;
}
