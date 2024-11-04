import { Injectable } from '@nestjs/common';
import { Ingredient } from './ingerdient.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class IngredientRepository extends Repository<Ingredient> {
    constructor(dataSource: DataSource) {
        super(Ingredient, dataSource.createEntityManager());
    }

    async findById(id: number): Promise<Ingredient> {
        return this.createQueryBuilder('ingredient')
            .innerJoinAndSelect('ingredient.product', 'product')
            .innerJoinAndSelect('ingredient.dish', 'dish')
            .where('ingredient.id = :id', { id })
            .getOne();
    }
}
