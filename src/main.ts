import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';
import { DatabaseExceptionFilter } from './filters/database.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new DatabaseExceptionFilter());
    app.use(cookieParser());
    const port = process.env.APP_PORT || 3000;
    await app.listen(port);
    console.log(`App started on port:${port}`);
}

bootstrap();
