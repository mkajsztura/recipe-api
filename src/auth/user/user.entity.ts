import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dish } from '../../recipe/dishes/dish.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'timestamp', default: () => 'now()' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'now()' })
    updatedAt: Date;

    @OneToMany(() => Dish, (dish) => dish.user)
    dishes: Dish[];
}
