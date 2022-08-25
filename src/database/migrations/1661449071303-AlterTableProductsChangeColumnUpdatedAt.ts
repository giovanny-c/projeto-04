import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableProductsChangeColumnUpdatedAt1661449071303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("products", "updated_at", new TableColumn({
            name: "updated_at",
            type: "timestamp",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("products", "updated_at", new TableColumn({
            name: "updated_at",
            type: "timestamp",

        }))
    }

}
