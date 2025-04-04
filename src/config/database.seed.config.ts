import { DataSource, DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from './database.config';
import { SeederOptions } from 'typeorm-extension';
import UserSeeder from '../database/seeds/0-user.seed';
import UserFactory from '../database/factories/user.factory';
import { User } from '../auth/user/user.entity';
import { Dish } from '../recipe/dishes/dish.entity';
import { Ingredient } from '../recipe/ingredients/ingerdient.entity';
import { Product } from '../recipe/products/entities/product.entity';
import ProductSeeder from '../database/seeds/1-product.seed';
import ProductFactory from '../database/factories/product.factory';
import DishSeeder from '../database/seeds/2-dish.seed';
import DishFactory from '../database/factories/dish.factory';
import IngredientSeeder from '../database/seeds/3-ingredient.seed';
import IngredientFactory from '../database/factories/ingredient.factory';

const seedDataSourceOptions: DataSourceOptions & SeederOptions = {
    ...dataSourceOptions,
    seeds: [UserSeeder, ProductSeeder, DishSeeder, IngredientSeeder],
    factories: [UserFactory, ProductFactory, DishFactory, IngredientFactory],
    entities: [User, Dish, Ingredient, Product],
};

export const dataSource = new DataSource(seedDataSourceOptions);
export default dataSource;
