import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDto } from './create-dish.dto';
import { IsNumber } from 'class-validator';

export class UpdateDishDto extends PartialType(CreateDishDto) {
    @IsNumber()
    id: number;
}
