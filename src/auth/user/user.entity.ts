import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Dish } from '../../recipe/dishes/dish.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @OneToMany(() => Dish, (dish) => dish.user)
    dishes: Dish[];
}
