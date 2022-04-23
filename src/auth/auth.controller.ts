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
import { PasswordRecoveryDto } from './dto/password-recovery.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  @Post('/password-recovery')
  @ApiOperation({ summary: 'Password recovery' })
  async passwordRecovery(
    @Body(ValidationPipe) passwordRecoveryDto: PasswordRecoveryDto,
  ): Promise<{ message: string }> {
    const result = await this.authService.passwordRecovery(passwordRecoveryDto);

    if (result.newPassword) {
      try {
        await this.emailService.sendPasswordRecoveryMessage(
          passwordRecoveryDto.email,
          result.newPassword,
        );

        return {
          message: 'Nueva contraseña enviada al correo electrónico ingresado',
        };
      } catch (e) {
        throw new InternalServerErrorException(e.message);
      }
    }
  }
}
