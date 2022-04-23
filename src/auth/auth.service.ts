import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async passwordRecovery(email: string): Promise<{ newPassword: string }> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException(
        `Usuario con correo electrónico ${email} no encontrado.`,
      );
    }

    const newPassword = this.getRandomPassword();

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(newPassword, user.salt);
    await user.save();

    return { newPassword };
  }

  private getRandomPassword(): string {
    return Math.random().toString(36).slice(-8).toLowerCase();
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
