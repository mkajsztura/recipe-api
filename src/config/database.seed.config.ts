import { DataSource, DataSourceOptions } from 'typeorm';
import {dataSourceOptions} from './database.config';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from '../database/seeds/user.seed';
import UserFactory from '../database/factories/user.factory';
import { User } from '../user/user.entity';
import { Dish } from '../recipe/dishes/dish.entity';
import { Ingredient } from '../recipe/ingredients/ingerdient.entity';
import { Product } from '../recipe/products/entities/product.entity';

const seedDataSourceOptions : DataSourceOptions & SeederOptions = {
    ...dataSourceOptions,
    seeds: [UserSeeder],
    factories: [UserFactory],
    entities: [User, Dish, Ingredient, Product],
};

export const dataSource = new DataSource(seedDataSourceOptions);
export default dataSource;
