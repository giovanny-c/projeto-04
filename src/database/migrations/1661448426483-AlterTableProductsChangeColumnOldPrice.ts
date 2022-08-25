import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableProductsChangeColumnOldPrice1661448426483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("products", "old_price", new TableColumn({
            name: "old_price",
            type: "numeric",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("products", "old_price", new TableColumn({
            name: "old_price",
            type: "numeric",

        }))
    }

}
