import * as bcrypt from 'bcryptjs';

export class AuthHelpers {
  static getRandomEmailValidationCode(): string {
    return Math.random().toString(36).slice(-6).toLowerCase();
  }

  static getRandomPhoneValidationCode(): string {
    return Math.random().toString(36).slice(-6).toLowerCase();
  }

  static getRandomPassword(): string {
    return Math.random().toString(36).slice(-8).toLowerCase();
  }

  static async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
