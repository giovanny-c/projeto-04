import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableOrdersAddColumnTrackingCode1669830765056 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("orders", new TableColumn({
            name: "tracking_code",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("orders", "tracking_code")
    }



}
