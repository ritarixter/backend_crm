import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as moment from 'moment';
import 'moment-timezone';
import * as dotenv from 'dotenv';
import { URL_FRONTEND } from './utils/constants';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  moment.tz.setDefault('Europe/Moscow');
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.enableCors({
    origin: ['http://frontend.corp.itsl.tel', 'http://localhost:3000/'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  });
  await app.listen(8000);
}
bootstrap();
