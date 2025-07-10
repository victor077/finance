import { AppError } from "core/errors/appError";
import { LoginDto, ResponseLoginDto } from "./auth.dto";
import { IAuthRepostory, IAuthService } from "./auth.interface";

export class AuthService implements IAuthService {
  constructor(private readonly authRepository: IAuthRepostory) {}

  async login(data: LoginDto): Promise<ResponseLoginDto> {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }
    return {
      name: user.name,
      email: user.email,
    };
  }
}
