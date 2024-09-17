import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('oqiwueoiwuqoieu8q29130198*&*&*(*9'))
  await app.listen(3000);
}
bootstrap();
