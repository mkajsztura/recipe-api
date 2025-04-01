import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Dish } from '../../recipe/dishes/dish.entity';
import { Product } from '../../recipe/products/entities/product.entity';
import { Ingredient } from '../../recipe/ingredients/ingerdient.entity';

export default class IngredientSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const products = await dataSource.getRepository(Product).find();
        const dishes = await dataSource.getRepository(Dish).find();
        const ingredientFactory = factoryManager.get(Ingredient);
        const getProd = () => products[Math.floor(Math.random() * products.length)];
        const getDish = () => dishes[Math.floor(Math.random() * dishes.length)];
        const ingredients = await Promise.all(
            Array(10)
                .fill(0)
                .map(async () => {
                    return await ingredientFactory.make({
                        product: getProd(),
                        dish: getDish(),
                    });
                }),
        );

        await dataSource.getRepository(Ingredient).save(ingredients);
    }
}
