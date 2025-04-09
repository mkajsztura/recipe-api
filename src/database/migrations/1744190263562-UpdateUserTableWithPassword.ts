import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUserTable1744190263564 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the 'password' column
        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'password',
                type: 'varchar',
                length: '255',
                isNullable: false,
            }),
        );

        // Rename 'username' to 'email'
        await queryRunner.renameColumn('user', 'username', 'email');

        await queryRunner.changeColumn('user', 'email', new TableColumn({
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert the 'email' column back to 'username'
        await queryRunner.renameColumn('user', 'email', 'username');

        // Revert the 'username' column properties (if they were changed)
        await queryRunner.changeColumn(
            'user',
            'username',
            new TableColumn({
                name: 'username',
                type: 'varchar',
                length: '255',
            }),
        );

        // Remove the 'password' column
        await queryRunner.dropColumn('user', 'password');
    }
}
