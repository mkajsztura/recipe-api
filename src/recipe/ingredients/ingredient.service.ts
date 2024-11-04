import { Injectable } from '@nestjs/common';
import { Ingredient } from './ingerdient.entity';
import { Dish } from '../dishes/dish.entity';
import { ProductsService } from '../products/products.service';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
    constructor(
        private ingredientRepository: IngredientRepository,
        private productService: ProductsService,
    ) {}

    async create(
        amount: number,
        dish: Dish,
        productId: number,
    ): Promise<Ingredient> {
        const ingredient = new Ingredient();
        ingredient.amount = amount;
        ingredient.dish = dish;
        ingredient.product = await this.productService.findOne(productId);
        console.log('ingredient:', ingredient);
        return await this.ingredientRepository.save(ingredient);
    }

    async findById(id: number): Promise<Ingredient> {
        console.log('id:', id);
        return this.ingredientRepository.findById(id);
    }
}
