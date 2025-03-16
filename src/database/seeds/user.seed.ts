import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../user/user.entity';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        // const repository =  dataSource.getRepository(User);
        // await repository.insert([
        //     {
        //         username: 'admin',
        //         id: 1,
        //     }
        // ]);

        const userFactory = factoryManager.get(User);
        // save 5 factory generated entities, to the database
        await userFactory.saveMany(5);
    }
}
