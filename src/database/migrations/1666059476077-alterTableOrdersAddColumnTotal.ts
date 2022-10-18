import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class alterTableOrdersAddColumnTotal1666059476077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("orders", new TableColumn({
            name: "total",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("orders", "total")
    }

}
