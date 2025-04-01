import { setSeederFactory } from 'typeorm-extension';
import { Dish } from '../../recipe/dishes/dish.entity';

export default setSeederFactory(Dish, (faker) => {
    const dish = new Dish();
    const productName = faker.commerce.productName();
    dish.name = productName;
    dish.slug = productName.toLowerCase().replace(/ /g, '-');
    dish.isPublic = !!Math.floor(Math.random()+1);
    dish.servings = Math.floor(Math.random() * 10) + 1;
    dish.description = faker.lorem.paragraph();

    return dish;
});
