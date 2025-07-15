import { AppError } from "errors/appError";
import { RegisterUserPeding, RequestLoginDto, ResponseLoginDto, ResponseRegistrationPeding } from "./auth.dto";
import { IAuthRepostory, IAuthService } from "./auth.interface";
import { hashedPassword, isValidPassword } from "utils.ts/hashed";
import { generateConfirmationToken } from "utils.ts/dbToken";
import { IEmailService } from "infra/email/email.interface";
export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepostory,
    private emailService: IEmailService
  ) {}

  async login(data: RequestLoginDto): Promise<ResponseLoginDto> {
    const user = await this.authRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }
    const hasValidPassword = await isValidPassword(
      data.password,
      user.password
    );

    if (!hasValidPassword) {
      throw new AppError("Invalid credentials", 401);
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async createUserPending(
    data: RegisterUserPeding
  ): Promise<ResponseRegistrationPeding> {
    const userExists = await this.authRepository.findByEmail(data.email);
    const userToken = generateConfirmationToken();
    if (userExists) {
      return { code: "USER_ALREADY_EXISTS", data: null };
    }
    const pendingRegistration =
      await this.authRepository.findPendingRegistrationByEmail(data.email);

    if (pendingRegistration) {
      const isExpired = new Date() > pendingRegistration.expiresAt;

      if (!isExpired) {
        await this.emailService.sendConfirmationEmail(data.email, userToken);
        return {
          code: "PENDING_REGISTRATION_VALID",
          data: { email: data.email },
        };
      } else {
        await this.authRepository.deletePedingRegistration(
          pendingRegistration.id
        );
      }
    }
    const password = await hashedPassword(data.password);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const result = await this.authRepository.createUserPending({
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
  async createUser(token: string) {
    console.log("token", token);
    const userExists = await this.authRepository.findPedingRegistrationByToken(
      token
    );
    if (!userExists) return null;
    const result = await this.authRepository.createUser({
      name: userExists.name,
      email: userExists.email,
      password: userExists.password,
    });
    return {
      name: result.name,
      email: result.email,
    };
  }
}
