export interface IEmailService {
  sendConfirmationEmail(to: string, token: string): Promise<void>;
}
