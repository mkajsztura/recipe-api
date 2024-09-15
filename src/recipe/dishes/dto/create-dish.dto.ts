import { IsOptional, IsString } from "class-validator";

export class CreateDishDto {
    @IsString()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    products: string[];
}
