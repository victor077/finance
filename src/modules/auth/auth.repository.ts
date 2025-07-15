import { Prisma } from "@prisma/client";
import { IAuthRepostory } from "./auth.interface";
import { prisma } from "plugins/prisma";

export class AuthRepository implements IAuthRepostory {
  async findByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  }
  createUserPending(data: Prisma.RegistroPendenteCreateInput) {
    return prisma.registroPendente.create({
      data: data,
    });
  }
  findPendingRegistrationByEmail(email: string) {
    return prisma.registroPendente.findFirst({ where: { email } });
  }
  deletePedingRegistration(id: number) {
    return prisma.registroPendente.delete({ where: { id: id } });
  }
  findPedingRegistrationByToken(token: string) {
    return prisma.registroPendente.findFirst({ where: { token } });
  }
  createUser(data: Prisma.UsuarioCreateInput) {
    return prisma.usuario.create({
      data: data,
    });
  }
}
