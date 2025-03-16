import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../../ingredients/ingerdient.entity';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar' })
    unit: 'kg' | 'l' | 'item';

    @Column({type: 'timestamp'})
    createdAt: Date

    @Column({type: 'timestamp'})
    updatedAt: Date

    // one product (can be assigned) to many ingredients
    @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
        onDelete: 'CASCADE',
    })
    ingredients: Ingredient[];
}
