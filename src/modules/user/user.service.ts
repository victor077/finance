import { Prisma } from "@prisma/client";
import { IUserRepository, IUserService } from "./user.interface";
import { RegisterDto } from "./user.dto";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) {}

    async getUserByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async createUser(data: RegisterDto) {
        const studentExists = await this.userRepository.findByEmail(data.email);
        if (studentExists) {
            throw new Error("User already exists");
        }
        return this.userRepository.createUser({
            name: data.name,
            email: data.email,
            
            password: data.password,
        });
    } 

    async updateUser(id: string, data: Prisma.UsuarioUpdateInput) {
        return this.userRepository.updateUser(id, data);
    }

    async deleteUser(id: string) {
        return this.userRepository.deleteUser(id);
    }
}