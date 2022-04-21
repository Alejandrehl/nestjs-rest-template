import { Module } from '@nestjs/common';
import { AppImports } from './app.imports';
import { UsersModule } from './users/users.module';

@Module({
  imports: [...AppImports, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
