import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TerminusModule } from '@nestjs/terminus';
import { TypegooseModule } from 'nestjs-typegoose';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

export const AppImports = [
  ScheduleModule.forRoot(),
  ConfigModule.forRoot({ isGlobal: true }),
  TypegooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      uri: config.get<string>('MONGO_URL', process.env.MONGO_URL),
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
      autoIndex: true,
    }),
    inject: [ConfigService],
  }),
  SendGridModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      apiKey: config.get<string>(
        'SENDGRID_API_KEY',
        process.env.SENDGRID_API_KEY,
      ),
    }),
    inject: [ConfigService],
  }),
  TerminusModule,
];
