import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar'})
    unit: 'kg' | 'l' | 'item';

    @Column({type: 'decimal'})
    amount: number;

    // many to one relation
    @Column({type: 'int'})
    dishId: number; // todo add relation to dish => foreign key
}
