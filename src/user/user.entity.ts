import { Dish } from "src/recipe/dishes/dish.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    username: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Dish, (dish) => dish.user)
    dishes: Dish[];
}
