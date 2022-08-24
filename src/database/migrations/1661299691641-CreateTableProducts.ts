import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableProducts1661299691641 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "price",
                    type: "numeric",
                },
                {
                    name: "old_price",
                    type: "numeric"
                },
                {
                    name: "description",
                    type: "varchar"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
