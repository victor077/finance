import { AppError } from "errors/appError";
import { RequestLoginDto, ResponseLoginDto } from "./auth.dto";
import { IAuthRepostory, IAuthService } from "./auth.interface";
import { isValidPassword } from "utils.ts/hashed";
export class AuthService implements IAuthService {
  constructor(private readonly authRepository: IAuthRepostory) {}

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
}
