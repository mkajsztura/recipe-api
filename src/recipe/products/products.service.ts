import { Injectable, NotFoundException } from '@nestjs/common';
import { DishesService } from '../dishes/dishes.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor ( @InjectRepository(Product) private productRepository: Repository<Product>,
        private dishesService: DishesService) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.save(createProductDto);
    }

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    async update(updateProductDto: UpdateProductDto): Promise<UpdateResult> {
        const productToUpdate = await this.findOne(updateProductDto.id);
        return this.productRepository.update(productToUpdate.id, productToUpdate);
    }

    async remove(id: number): Promise<Product> {
        const productToRemove = await this.findOne(id);
        return this.productRepository.remove(productToRemove);
    }
}
