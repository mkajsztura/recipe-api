import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';

@Injectable()
export class DishesService {
    create(createDishDto: CreateDishDto): Promise<Dish> {
        const newDish = new Dish();
        Object.assign(newDish, createDishDto);
        return newDish.save();
    }

    findAll(): Promise<Dish[]> {
        return Dish.find({ relations: ['products']});
    }

    async findOne(id: number): Promise<Dish> {
        const dish = await Dish.findOne({relations: ['products'], where: { id }});
        if (!dish) {
            throw new NotFoundException(`Dish #${id} not found`);
        }
        return dish;
    }

    async update(updateDishDto: UpdateDishDto): Promise<Dish> {
        const dishToUpdate = await this.findOne(updateDishDto.id);
        Object.assign(dishToUpdate, updateDishDto);
        return dishToUpdate.save();
    }

    async remove(dishId: number): Promise<Dish> {
        const dishToRemove = await this.findOne(dishId);

        return dishToRemove.remove();
    }
}
