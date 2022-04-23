import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthHelpers } from 'src/helpers/auth.helpers';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.validateUserPassword(loginUserDto);

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const payload: JwtPayload = user;
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async passwordRecovery(
    passwordRecoveryDto: PasswordRecoveryDto,
  ): Promise<{ newPassword: string }> {
    const user = await this.userModel.findOne({
      email: passwordRecoveryDto.email,
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con correo electrónico ${passwordRecoveryDto.email} no encontrado.`,
      );
    }

    const newPassword = AuthHelpers.getRandomPassword();

    user.salt = await bcrypt.genSalt();
    user.password = await AuthHelpers.hashPassword(newPassword, user.salt);
    await user.save();

    return { newPassword };
  }

  private async validateUserPassword(
    loginUserDto: LoginUserDto,
  ): Promise<User | null> {
    const { email, password } = loginUserDto;

    const user = await this.userModel
      .findOne({ email })
      .select('-password -salt -__v')
      .exec();

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }
}
