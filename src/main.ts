import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();
