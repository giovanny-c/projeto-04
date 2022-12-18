
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableOrdersAddColumnShippmentConfirmation1671324192668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("orders", new TableColumn({
            name: "shipping_confirmation",
            type: "boolean",
            default: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("orders", "shipping_confirmation")
    }

}
