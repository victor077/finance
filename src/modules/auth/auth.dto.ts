import z from "zod";

export interface ResponseLoginDto {
  name: string;
  email: string;
}
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginDto = z.infer<typeof loginSchema>;
