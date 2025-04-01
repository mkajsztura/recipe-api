import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../auth/user/user.entity';

export default setSeederFactory(User, (faker) => {
    const user = new User();
    user.username = faker.internet.userName();
    return user;
})
