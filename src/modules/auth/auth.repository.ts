import { Prisma, PrismaClient, Usuario } from "@prisma/client";
import { IAuthRepostory } from "./auth.interface";
import { prisma } from "plugins/prisma";

export class AuthRepository implements IAuthRepostory {
  async findByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  }
}
