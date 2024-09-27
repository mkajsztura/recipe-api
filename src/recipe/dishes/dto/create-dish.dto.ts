import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishDto {
    @IsString()
    name: string;

    @IsOptional()
    description: string;

    @IsNumber()
    servings: number;

    @IsOptional()
    products: string[];
}
