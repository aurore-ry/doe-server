import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import fastifySecureSession from '@fastify/secure-session';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Doe Society')
    .setDescription('The Doe Society API description')
    .setVersion('1.0')
    .addTag('Jane Doe')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.register(fastifySecureSession, {
    cookieName: process.env.COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    salt: process.env.SESSION_SALT,
    cookie: {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 2073600,
      signed: true,
    },
  });

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
