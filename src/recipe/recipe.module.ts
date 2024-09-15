import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { DishesController } from './dishes/dishes.controller';
import { ProductsService } from './products/products.service';
import { DishesService } from './dishes/dishes.service';

@Module({
    imports: [],
    controllers: [ProductsController, DishesController],
    providers: [ProductsService, DishesService],
})
export class RecipeModule {}
