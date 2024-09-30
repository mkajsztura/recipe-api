import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DishesService } from '../dishes/dishes.service';

@Injectable()
export class ProductsService {
    constructor(@Inject(forwardRef(() => DishesService)) private dishesService: DishesService) {
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = new Product();
        Object.assign(newProduct, createProductDto);
        const dish = await this.dishesService.findOne(createProductDto.dishId);

        if(!dish) {
            throw new NotFoundException(`Dish #${createProductDto.dishId} not found`);
        }

        newProduct.dish = dish;
        return newProduct.save();
    }

    findAll(): Promise<Product[]> {
        return Product.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await Product.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    async update(updateProductDto: UpdateProductDto): Promise<Product> {
        const productToUpdate = await this.findOne(updateProductDto.id);
        Object.assign(productToUpdate, updateProductDto);
        return productToUpdate.save();
    }

    async remove(id: number): Promise<Product> {
        const productToRemove = await this.findOne(id);
        return productToRemove.remove();
    }
}
