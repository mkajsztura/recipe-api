import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../auth/user/user.entity';
import { Dish } from '../../recipe/dishes/dish.entity';

export default class DishtSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const users = await dataSource.getRepository(User).find();
        const dishFactory = factoryManager.get(Dish);
        const getUser = () => users[Math.floor(Math.random() * users.length)];
        const dishes = await Promise.all(
            Array(10)
                .fill(0)
                .map(async () => {
                    return await dishFactory.make({
                        user: getUser(),
                    });
                }),
        );
        await dataSource.getRepository(Dish).save(dishes);
    }
}
