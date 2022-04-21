import { Module } from '@nestjs/common';
import { AppImports } from './app.imports';

@Module({
  imports: [...AppImports],
  controllers: [],
  providers: [],
})
export class AppModule {}
