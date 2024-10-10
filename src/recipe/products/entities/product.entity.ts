import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dish } from '../../dishes/dish.entity';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar'})
    unit: 'kg' | 'l' | 'item';

    @Column({type: 'decimal'})
    amount: number;

    @ManyToOne(() => Dish, (dish: Dish) => dish.products, {onDelete: 'CASCADE'})
    dish: Dish;
}
