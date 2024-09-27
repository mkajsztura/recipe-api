import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

    create(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = new Product();
        Object.assign(newProduct, createProductDto);
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
