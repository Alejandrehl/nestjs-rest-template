import { Module } from '@nestjs/common';
import { AppImports } from './app.imports';
import { HealthController } from './health/health.controller';
import { TypegooseHealthIndicator } from './health/typegoose.indicator';

@Module({
  imports: [...AppImports],
  controllers: [HealthController],
  providers: [TypegooseHealthIndicator],
})
export class AppModule {}
