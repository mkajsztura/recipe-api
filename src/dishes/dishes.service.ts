import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class DishesService {
    constructor(
        @Inject(forwardRef(() => ProductsService))
        private productService: ProductsService,
    ) {}

    create(createDishDto: CreateDishDto) {
        return 'This action adds a new dish';
    }

    findAll() {
        return `This action returns all dishes`;
    }

    findOne(id: number) {
        return `This action returns a #${id} dish`;
    }

    update(id: number, updateDishDto: UpdateDishDto) {
        return `This action updates a #${id} dish`;
    }

    remove(id: number) {
        return `This action removes a #${id} dish`;
    }
}
