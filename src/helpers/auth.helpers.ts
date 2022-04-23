import * as bcrypt from 'bcryptjs';

export class AuthHelpers {
  static getRandomPassword(): string {
    return Math.random().toString(36).slice(-8).toLowerCase();
  }

  static async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
