import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

function addMiddleware(instance): void {
  instance.use(bodyParser.json());
  instance.use(cors());
  instance.use(helmet());
}
function setUpExpress() {
  const instance = express();
  addMiddleware(instance);
  return instance;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // origin: true,
    preflightContinue: false,
    credentials: true,
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'XMLHttpRequest',
      'Access-Control-Allow-Origin',
    ],
  });

  const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'XMLHttpRequest',
      'Access-Control-Allow-Origin',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  };

  app.use(cors(options));
  app.use(helmet());

  app.use(setUpExpress());

  await app.listen(3000);
}
bootstrap();
