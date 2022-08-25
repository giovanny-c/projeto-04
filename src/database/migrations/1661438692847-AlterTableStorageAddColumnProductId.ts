import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableStorageAddColumnProductId1661438692847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("storage", new TableColumn({
            name: "product_id",
            type: "uuid",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("storage", "product_id")
    }

}
