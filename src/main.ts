import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const port = process.env.APP_PORT || 3000;
    await app.listen(port);
    console.log(`App started on port:${port}`);
}

bootstrap();
