import { prisma } from "plugins/prisma";
import { IUserRepository } from "./user.interface";
import { Prisma, Usuario } from "@prisma/client";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string) {
    const prismaUser = await prisma.usuario.findUnique({
      where: { email: email },
    });

    return prismaUser;
  }

  createUser(data: Prisma.UsuarioCreateInput) {
    return prisma.usuario.create({
      data: data,
    });
  }

  updateUser(id: string) {
    return prisma.usuario.update({
      where: { id: id },
      data: {},
    });
  }

  deleteUser(id: string) {
    return prisma.usuario.delete({
      where: { id },
    });
  }

  createUserPending(data: Prisma.RegistroPendenteCreateInput) {
    return prisma.registroPendente.create({
      data: data,
    });
  }

  findPendingRegistration(email: string) {
    return prisma.registroPendente.findFirst({ where: { email } });
  }

  deletePedingRegistration(id: number) {
    return prisma.registroPendente.delete({ where: { id: id } });
  }
}
