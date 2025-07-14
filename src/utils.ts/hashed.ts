import { compare, hash } from "bcrypt";
export async function isValidPassword(
  confirmPassword: string,
  password: string
): Promise<boolean> {
  const isValidPassword = await compare(confirmPassword, password);
  return isValidPassword;
}

export async function hashedPassword(value: string): Promise<string> {
  return await hash(value, 12);
}
