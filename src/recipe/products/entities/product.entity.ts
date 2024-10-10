import { Ingredient } from 'src/recipe/ingredients/ingerdient.entity';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar' })
    unit: 'kg' | 'l' | 'item';

    // one product (can be assigned) to many ingredients
    @OneToMany(() => Ingredient, (ingredient) => ingredient.product, {
        onDelete: 'CASCADE',
    })
    ingredients: Ingredient[];
}
