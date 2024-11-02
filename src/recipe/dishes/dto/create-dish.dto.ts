import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { CreateIngredientDto } from 'src/recipe/ingredients/dto/create-ingredient.dto';

export class CreateDishDto {
    @IsString()
    name: string;

    @IsOptional()
    description: string;

    @IsBoolean()
    isPublic: boolean;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateIngredientDto)
    ingredients: CreateIngredientDto[];
}
