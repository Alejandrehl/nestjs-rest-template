import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordRecoveryDto } from './dto/password-recovery.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ): Promise<{ accessToken: string }> {
    const { accessToken, email, emailValidationCode } =
      await this.authService.signUp(registerUserDto);

    await this.emailService.sendWelcomeMessage(email, emailValidationCode);

    return { accessToken };
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Login user with email and password' })
  signIn(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(loginUserDto);
  }

  @Post('/password-recovery')
  @ApiOperation({ summary: 'Password recovery' })
  async passwordRecovery(
    @Body(ValidationPipe) passwordRecoveryDto: PasswordRecoveryDto,
  ): Promise<{ message: string }> {
    const result = await this.authService.passwordRecovery(passwordRecoveryDto);

    await this.emailService.sendPasswordRecoveryMessage(
      passwordRecoveryDto.email,
      result.newPassword,
    );

    return {
      message: 'Nueva contraseña enviada al correo electrónico ingresado',
    };
  }
}
