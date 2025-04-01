import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { envValidationSchema } from './config/env-validation.config';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.development`,
            validationSchema: envValidationSchema,
        }),
        RecipeModule,
        TypeOrmModule.forRootAsync(databaseConfig),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
