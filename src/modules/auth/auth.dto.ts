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
