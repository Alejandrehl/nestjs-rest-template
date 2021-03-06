import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
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
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private jwtService: JwtService,
  ) {}

  async signUp(registerUserDto: RegisterUserDto): Promise<{
    accessToken: string;
    email: string;
    emailValidationCode: string;
  }> {
    const { name, lastName, email, phoneNumber, password, confirmPassword } =
      registerUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden.');
    }

    const userExists = await this.userModel.findOne({ email });

    if (userExists) {
      throw new ConflictException('Correo electrónico registrado previamente');
    }

    const user = new User();
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.salt = await bcrypt.genSalt();
    user.password = await AuthHelpers.hashPassword(password, user.salt);
    user.emailValidationCode = AuthHelpers.getRandomEmailValidationCode();
    user.phoneValidationCode = AuthHelpers.getRandomPhoneValidationCode();

    try {
      const createdUser = new this.userModel(user);
      await createdUser.save();

      const { accessToken } = await this.signIn({ email, password });

      return {
        accessToken,
        email,
        emailValidationCode: user.emailValidationCode,
      };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async signIn(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const payload = await this.validateUserPassword(loginUserDto);

    if (!payload) throw new UnauthorizedException('Credenciales inválidas');

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
  ): Promise<JwtPayloadDto> {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email }).exec();

    if (user && (await user.validatePassword(password))) {
      return {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        emailValidationCode: user.emailValidationCode,
        isValidEmail: user.isValidEmail,
        phoneNumber: user.phoneNumber,
        phoneValidationCode: user.phoneValidationCode,
        isValidPhone: user.isValidPhone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    }

    return null;
  }
}
