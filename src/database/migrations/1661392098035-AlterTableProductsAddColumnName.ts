import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableProductsAddColumnName1661392098035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("products", new TableColumn({
            name: "name",
            type: "varchar"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "name")
    }

}
