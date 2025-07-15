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

}
