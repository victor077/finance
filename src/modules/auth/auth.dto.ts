import z from "zod";

export interface ResponseLoginDto {
  id: string;
  name: string;
  email: string;
}
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RequestLoginDto = z.infer<typeof loginSchema>;
export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export type UserResponseDto = z.infer<typeof userSchema>;

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$!%&*?])[A-Za-z\d@#$!%&*?]{5,}$/;
export const registerUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().regex(passwordRegex, {
    message:
      "A senha deve conter ao menos 5 caracteres, uma letra maiúscula e um caractere especial",
  }),
});

export type RequestRegisterDto = z.infer<typeof registerUserSchema>;

export interface ResponseUserDto {
  name: string;
  email: string;
}

export const registerUserPedingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().regex(passwordRegex, {
    message:
      "A senha deve conter ao menos 5 caracteres, uma letra maiúscula e um caractere especial",
  }),
});

export type RegisterUserPeding = z.infer<typeof registerUserPedingSchema>;

export type ResponseRegistrationPeding =
  | {
      code: "SUCCESS";
      data: { message: string };
    }
  | {
      code: "USER_ALREADY_EXISTS";
      data: null;
    }
  | {
      code: "PENDING_REGISTRATION_VALID";
      data: { email: string };
    }
  | {
      code: "PENDING_REGISTRATION_EXPIRED";
      data: { message: string };
    };
