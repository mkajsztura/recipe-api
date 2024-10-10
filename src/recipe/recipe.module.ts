import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishesController } from './dishes/dishes.controller';
import { DishesService } from './dishes/dishes.service';
import { Dish } from './dishes/dish.entity';
import { Product } from './products/entities/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Dish])],
    controllers: [ProductsController, DishesController],
    providers: [ProductsService, DishesService],
})
export class RecipeModule {}
