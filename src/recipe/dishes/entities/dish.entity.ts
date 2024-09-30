import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Dish extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ nullable: true, type: 'text' })
    description?: string;
    
    @Column({ type: 'decimal' })
    servings: number;

    @OneToMany(() => Product, (product) => product.dish)
    products: Product[];
}
