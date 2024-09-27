import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dish extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'decimal' })
    servings: string;

    @Column({ nullable: true, type: 'text' })
    description?: string;

    // @OneToMany(() => Product, product => product.dish)
    // @Column()
    // products: Product[];
}
