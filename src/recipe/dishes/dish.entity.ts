import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../ingredients/ingerdient.entity';
import { User } from '../../auth/user/user.entity';

@Entity()
export class Dish extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar' })
    slug: string;

    @Column({ type: 'int' })
    servings: number;

    @Column({ nullable: true, type: 'text' })
    description?: string;

    @Column({ type: 'boolean', default: false })
    isPublic: boolean;

    @Column({ type: 'timestamp', default: () => 'now()' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'now()' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.dishes, { nullable: false, onDelete: 'CASCADE' })
    user: User;

    // one dish to many ingredients
    @OneToMany(() => Ingredient, (ingredient) => ingredient.dish)
    ingredients: Ingredient[];
}
