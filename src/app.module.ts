import { Module } from '@nestjs/common';
import { AppImports } from './app.imports';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [...AppImports, UsersModule, AuthModule, EmailModule],
  controllers: [],
  providers: [EmailService],
})
export class AppModule {}
