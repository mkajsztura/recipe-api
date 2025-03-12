import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateIngredientTable1741766685683 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "ingredient",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "amount",
                        type: "int",
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            "ingredient",
            new TableForeignKey({
                columnNames: ["dishId"],
                referencedColumnNames: ["id"],
                referencedTableName: "dish",
                onDelete: "CASCADE",
            }),
        );

        await queryRunner.createForeignKey(
            "ingredient",
            new TableForeignKey({
                columnNames: ["productId"],
                referencedColumnNames: ["id"],
                referencedTableName: "product",
                onDelete: "NO ACTION",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("ingredient");
    }
}
