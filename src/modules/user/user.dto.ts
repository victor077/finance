import z from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

export type UserResponseDto = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export interface ResponseUserDto {
  name: string;
  email: string;
}
