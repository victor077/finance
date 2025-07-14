import { Prisma, Usuario } from "@prisma/client";
import { RequestLoginDto, ResponseLoginDto } from "./auth.dto";

export interface IAuthRepostory {
  findByEmail(email: string): Promise<Usuario | null>;
}

export interface IAuthService {
  login(data: RequestLoginDto): Promise<ResponseLoginDto>;
}
