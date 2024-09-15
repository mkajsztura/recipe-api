import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DishesModule } from './dishes/dishes.module';

@Module({
    imports: [ProductsModule, DishesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
