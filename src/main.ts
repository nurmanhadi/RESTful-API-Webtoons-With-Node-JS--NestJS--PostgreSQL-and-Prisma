import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express'
import * as path from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('oqiwueoiwuqoieu8q29130198*&*&*(*9'))

  const config = new DocumentBuilder()
    .setTitle('Sinikomik')
    .setDescription('Sinikomik open api')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.use('/public', express.static(path.join(__dirname,'..', 'public')))

  await app.listen(3000);
}
bootstrap();
