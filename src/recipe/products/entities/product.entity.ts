import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    name: string;

    @Column({type: 'varchar'})
    unit: 'kg' | 'l' | 'item';

    @Column({type: 'decimal'})
    amount: number;

    // @Column({type: 'int'})
    // dishId: number; // todo add relation to dish => foreign key
}
