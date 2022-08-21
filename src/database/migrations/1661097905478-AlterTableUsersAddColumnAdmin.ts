import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableUsersAddColumnAdmin1661097905478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "admin",
            type: "boolean"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "admin")
    }

}
