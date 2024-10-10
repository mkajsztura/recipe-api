import { User } from 'src/user/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from '../ingredients/ingerdient.entity';

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

    @Column({ type: 'boolean' })
    isPublic: boolean;

    @ManyToOne(() => User, (user) => user.dishes)
    user: User;

    // one dish to many ingredients
    @OneToMany(() => Ingredient, (ingredient) => ingredient.dish, {
        onDelete: 'CASCADE',
    })
    ingredients: Ingredient[];
}
