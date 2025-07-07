import 'dotenv/config'; // ✅ Load .env before anything else
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    cors: {
      origin: '*',
      exposedHeaders: ['Authorization'],
    },
  });

  const options = new DocumentBuilder()
    .setTitle('Personalized Horoscope API')
    .setDescription(
      'Backend service that provides personalized daily horoscopes based on user zodiac signs.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  const port = parseInt(process.env.API_PORT || '4000', 10);
  const host = process.env.API_HOST || '0.0.0.0';

  Logger.log(`🌐 ENV loaded: HOST=${host}, PORT=${port}`, 'Bootstrap');

  await app.listen(port, host);
  Logger.log(
    `🚀 Application is running on http://${host}:${port}`,
    'Bootstrap',
  );
}

bootstrap();
