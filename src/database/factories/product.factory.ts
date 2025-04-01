import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../../recipe/products/entities/product.entity';

const units = ['kg', 'l', 'item'] as const;
export default setSeederFactory(Product, (faker) => {
    const product = new Product();
    product.name = faker.commerce.product();
    product.unit = units[Math.floor(Math.random() * units.length)];
    return product;
});
