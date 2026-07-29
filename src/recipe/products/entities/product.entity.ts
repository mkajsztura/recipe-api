import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../../ingredients/ingerdient.entity';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    unit: 'kg' | 'l' | 'item';

    @Column({ type: 'timestamp', default: () => 'now()' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'now()' })
    updatedAt: Date;

    // one product (can be assigned) to many ingredients
    @OneToMany(() => Ingredient, (ingredient) => ingredient.product)
    ingredients: Ingredient[];
}
