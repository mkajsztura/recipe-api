import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { Ingredient } from './ingerdient.entity';
import { IngredientService } from './ingredient.service';

@Controller('ingredients')
export class IngredientController {
    constructor(
        private ingredientService: IngredientService,
    ) {}

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Ingredient> {
        const ingredient = await this.ingredientService.findById(id);
        if(!ingredient) {
            throw new NotFoundException(`Ingredient #${id} not found`);
        }
        return ingredient;
    }
}
