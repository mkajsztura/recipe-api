import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Dish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'decimal'})
    servings: string;

    @Column({ nullable: true, type: 'text'})
    description?: string;

    // @OneToMany(() => Product, product => product.dish)
    @Column()
    products: Product[];
}
