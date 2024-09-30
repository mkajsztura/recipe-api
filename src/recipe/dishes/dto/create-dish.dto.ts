import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from 'src/recipe/products/entities/product.entity';

export class CreateDishDto {
    @IsString()
    name: string;

    @IsOptional()
    description: string;

    @IsNumber()
    servings: number;

    @IsOptional()
    products: Product[];
}
