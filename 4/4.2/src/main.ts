import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/transform.interceptor';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  const swapi_config = new DocumentBuilder()
    .setTitle('SWAPI application')
    .setDescription('The Star Wars API description')
    .setVersion('1.0')
    .addTag('swapi')
    .build();
  const document = SwaggerModule.createDocument(app, swapi_config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
