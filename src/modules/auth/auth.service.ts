import { LoginDto, RegisterDto} from "./auth.dto";
import { IAuthRepostory, IAuthService } from "./auth.interface";

export class AuthService implements IAuthService {
  constructor(private readonly authRepository: IAuthRepostory) {}

  async login(data: LoginDto){
    return await this.authRepository.findByEmail(data.email);
  }

  async register(data: RegisterDto) {
    return  await this.authRepository.findByEmail(data.email);
  }
}
