import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const {
    PORT,
    ORIGIN,
    APPLICATION_NAME,
    APPLICATION_DESCRIPTION,
    APPLICATION_VERSION,
    APPLICATION_CONTACT_NAME,
    APPLICATION_CONTACT_WEBSITE,
    APPLICATION_CONTACT_EMAIL,
  } = process.env;

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.enableCors({
    origin: ORIGIN,
  });

  const options = new DocumentBuilder()
    .setTitle(APPLICATION_NAME)
    .setDescription(APPLICATION_DESCRIPTION)
    .setVersion(APPLICATION_VERSION)
    .setContact(
      APPLICATION_CONTACT_NAME,
      APPLICATION_CONTACT_WEBSITE,
      APPLICATION_CONTACT_EMAIL,
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
