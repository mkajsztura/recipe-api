import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Dish } from '../dishes/dish.entity';
import { Product } from '../products/entities/product.entity';

@Entity()
export class Ingredient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal' })
    amount: number;

    // many ingredients to one dish
    @ManyToOne(() => Dish, (dish) => dish.ingredients)
    dish: Dish;

    @ManyToOne(() => Product, (product) => product.ingredients)
    product: Product;
}
