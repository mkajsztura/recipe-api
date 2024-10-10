import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
    imports: [RecipeModule, TypeOrmModule.forRoot({
        type: 'sqlite',
        database: './database/my-db.sqlite3',
        autoLoadEntities: true,
        synchronize: true,
    }), UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
