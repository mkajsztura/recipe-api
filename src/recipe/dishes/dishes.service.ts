import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './dish.entity';

@Injectable()
export class DishesService {
    constructor(
        @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    ) {}

    create(createDishDto: CreateDishDto): Promise<Dish> {
        // najpierw dodać ingredients?
        return this.dishRepository.save(createDishDto);
    }

    findAll(): Promise<Dish[]> {
        return this.dishRepository.find({ relations: ['products'] });
    }

    async findOne(id: number): Promise<Dish> {
        const dish = this.dishRepository.findOne({
            relations: ['products'],
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
