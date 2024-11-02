import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './dish.entity';
import { IngredientService } from '../ingredients/ingredient.service';

@Injectable()
export class DishService {
    constructor(
        @InjectRepository(Dish) private dishRepository: Repository<Dish>,
        private ingredientService: IngredientService
    ) {}

    async create(createDishDto: CreateDishDto): Promise<Dish> {
        const dish = new Dish();
        dish.name = createDishDto.name;
        dish.description = createDishDto.description;
        dish.isPublic = createDishDto.isPublic;

        const newDish = await this.dishRepository.save(dish);

        createDishDto.ingredients.forEach(async (ingredient) => {
            await this.ingredientService.create(ingredient.amount, newDish, ingredient.productId);
        });

        return this.dishRepository.findOneBy({ id: newDish.id });
    }

    findAll(): Promise<Dish[]> {
        return this.dishRepository.find({ relations: ['products'] });
    }

    async findOne(id: number): Promise<Dish> {
        const dish = this.dishRepository.findOne({
            relations: ['ingredients'],
            where: { id },
        });
        if (!dish) {
            throw new NotFoundException(`Dish #${id} not found`);
        }
        return dish;
    }

    async update(updateDishDto: UpdateDishDto): Promise<UpdateResult> {
        const dishToUpdate = await this.findOne(updateDishDto.id);
        return this.dishRepository.update(dishToUpdate.id, updateDishDto);
    }

    async remove(dishId: number): Promise<Dish> {
        const dishToRemove = await this.findOne(dishId);

        return this.dishRepository.remove(dishToRemove);
    }
}
