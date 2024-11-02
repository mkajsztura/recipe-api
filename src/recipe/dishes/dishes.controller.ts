import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
    constructor(private readonly dishesService: DishService) {
    }

    @Post()
    create(@Body() createDishDto: CreateDishDto) {
        return this.dishesService.create(createDishDto);
    }

    @Get()
    findAll() {
        return this.dishesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.dishesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
        return this.dishesService.update(updateDishDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.dishesService.remove(+id);
    }
}
