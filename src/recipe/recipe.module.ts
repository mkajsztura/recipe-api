import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishesController } from './dishes/dishes.controller';
import { DishService } from './dishes/dish.service';
import { Dish } from './dishes/dish.entity';
import { Product } from './products/entities/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { Ingredient } from './ingredients/ingerdient.entity';
import { IngredientService } from './ingredients/ingredient.service';
import { IngredientController } from './ingredients/ingredient.controller';
import { IngredientRepository } from './ingredients/ingredient.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            Dish,
            Ingredient,
        ]),
    ],
    controllers: [ProductsController, DishesController, IngredientController],
    providers: [ProductsService, DishService, IngredientService, IngredientRepository],
})
export class RecipeModule {}
