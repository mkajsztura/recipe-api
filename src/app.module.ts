import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { DATABASE_CONFIG } from './config/database.config';
import { envValidationSchema } from './config/env-validation.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.development`,
            validationSchema: envValidationSchema,
        }),
        RecipeModule,
        TypeOrmModule.forRootAsync(DATABASE_CONFIG),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
