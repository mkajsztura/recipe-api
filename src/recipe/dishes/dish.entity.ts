import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../ingredients/ingerdient.entity';
import { User } from '../../auth/user/user.entity';

@Entity()
export class Dish extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    slug: string;

    @Column({ type: 'int' })
    servings: number;

    @Column({ nullable: true, type: 'text' })
    description?: string;

    @Column({ type: 'boolean' })
    isPublic: boolean;

    @Column({type: 'timestamp'})
    createdAt: Date

    @Column({type: 'timestamp'})
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.dishes)
    user: User;

    // one dish to many ingredients
    @OneToMany(() => Ingredient, (ingredient) => ingredient.dish, {
        onDelete: 'CASCADE',
    })
    ingredients: Ingredient[];
}
