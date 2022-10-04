import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateOrdersProductsTable1664844297412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "orders_products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "order_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                    },

                    {
                        name: "quantity",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        
                    },
                ],
                foreignKeys: [
                    {
                        name: "OrdersProductsOrder",
                        columnNames: ["order_id"],
                        referencedTableName: "orders",
                        referencedColumnNames: ["id"],
                        onDelete: "SET NULL"
                    },
                    {
                        name: "OrdersProductsProduct",
                        columnNames: ["product_id"],
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        onDelete: "SET NULL"
                    }
                ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("orders_products", "OrdersProductsOrder")
        await queryRunner.dropForeignKey("orders_products", "OrdersProductsProduct")
        await queryRunner.dropTable("orders_products")
    }

}
