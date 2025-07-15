import { Prisma } from "@prisma/client";
import { IUserRepository, IUserService } from "./user.interface";
import bcrypt from "bcrypt";
import { AppError } from "errors/appError";
import { RegisterUserPeding, ResponseRegistrationPeding } from "./user.dto";
import { IEmailService } from "infra/email/email.interface";
import { hashedPassword } from "utils.ts/hashed";
import { generateConfirmationToken } from "utils.ts/dbToken";

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private emailService: IEmailService
  ) {}

  async findUserByEmail(email: string) {
    const result = await this.userRepository.findByEmail(email);
    return {
      name: result?.name,
      email: result?.email,
    };
  }

  async createUser(token: string) {
    const userExists = await this.userRepository.findPedingRegistrationByToken(
      token
    );
    if (!userExists) return null;
    const result = await this.userRepository.createUser({
      name: userExists.name,
      email: userExists.email,
      password: userExists.password,
    });
    return {
      name: result.name,
      email: result.email,
    };
  }

  async updateUser(data: Prisma.UsuarioUpdateInput) {
    return this.userRepository.updateUser(data.id as string);
  }

  async deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }

  async createUserPending(
    data: RegisterUserPeding
  ): Promise<ResponseRegistrationPeding> {
    const userExists = await this.userRepository.findByEmail(data.email);
    const userToken = generateConfirmationToken();
    if (userExists) {
      return { code: "USER_ALREADY_EXISTS", data: null };
    }
    const pendingRegistration =
      await this.userRepository.findPendingRegistrationByEmail(data.email);

    if (pendingRegistration) {
      const isExpired = new Date() > pendingRegistration.expiresAt;

      if (!isExpired) {
        await this.emailService.sendConfirmationEmail(data.email, userToken);
        return {
          code: "PENDING_REGISTRATION_VALID",
          data: { email: data.email },
        };
      } else {
        await this.userRepository.deletePedingRegistration(
          pendingRegistration.id
        );
      }
    }

    const password = await hashedPassword(data.password);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const result = await this.userRepository.createUserPending({
      name: data.name,
      email: data.email,
      password: password,
      token: userToken,
      expiresAt: expiresAt,
    });

    await this.emailService.sendConfirmationEmail(result.email, result.token);

    return {
      code: "SUCCESS",
      data: { message: "Confirmation email sent." },
    };
  }
}
