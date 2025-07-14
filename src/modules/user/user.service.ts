import { Prisma } from "@prisma/client";
import { IUserRepository, IUserService } from "./user.interface";
import bcrypt from "bcrypt";
import { AppError } from "errors/appError";
import {
  RegisterUserPeding,
  RequestRegisterDto,
  ResponseRegistrationPeding,
} from "./user.dto";
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

  async createUser(data: RequestRegisterDto) {
    // const userExists = await this.userRepository.findByEmail(data.email);
    // if (userExists) {
    //   throw new AppError("User already exists", 409);
    // }
    // const hashedPassword = await bcrypt.hash(data.password, 12);
    // const result = await this.userRepository.createUser({
    //   name: data.name,
    //   email: data.email,
    //   password: hashedPassword,
    // });
    // const payload = { userId: result.id, email: result.email };
    // const expirationTime: any = "1h";
    // const confirmationToken = this.tokenService.generate(
    //   payload,
    //   expirationTime
    // );
    // await this.emailService.sendConfirmationEmail(
    //   data.email,
    //   confirmationToken
    // );
    return {
      name: "victor",
      email: "em densenvolvimento",
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
      await this.userRepository.findPendingRegistration(data.email);

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
