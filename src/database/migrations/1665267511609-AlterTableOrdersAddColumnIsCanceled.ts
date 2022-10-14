import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableOrdersAddColumnIsCanceled1665267511609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("orders", new TableColumn({
            name: "status",
            type: "varchar",
            
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("orders", "status")
    }

}
