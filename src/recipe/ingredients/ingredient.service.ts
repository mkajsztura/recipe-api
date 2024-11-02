import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingerdient.entity';
import { Dish } from '../dishes/dish.entity';
import { ProductsService } from '../products/products.service';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(Ingredient)
        private ingredientRepository: Repository<Ingredient>,
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
        console.log('ingredient:', ingredient)
        return await this.ingredientRepository.save(ingredient);
    }
}
