import { prisma } from "@prisma";
import { IUserRepository } from "./user.interface";
import { Prisma } from "@prisma/client";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string) {
    const prismaUser = await prisma.usuario.findUniqueOrThrow({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return prismaUser;
  }

  createUser(data: Prisma.UsuarioCreateInput) {
    return prisma.usuario.create({
      data: data,
    });
  }

  updateUser(id: string, data: Prisma.UsuarioUpdateInput) {
    return prisma.usuario.update({
      where: { id },
      data,
    });
  }

  deleteUser(id: string) {
    return prisma.usuario.delete({
      where: { id },
    });
  }
}
