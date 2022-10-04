import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateOrdersTable1664843790183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "orders",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "customer_id",
                    type: "uuid",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp"
                },
                {
                    name: "updated_at",
                    type: "timestamp"
                },
                
            ],
            foreignKeys: [
                {
                    name: "OrdersCustomer",
                    columnNames: ["customer_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("orders", "OrdersCustomer"),
        await queryRunner.dropTable("orders")
    }

}
