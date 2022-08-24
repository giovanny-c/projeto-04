import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class AlterTableProductsAddColumns1661301184634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("products", [
            new TableColumn({
                name: "vendor_id",
                type: "uuid"
            }),
            new TableColumn({
                name: "quantity",
                type: "numeric"
            }),
            new TableColumn({
                name: "available",
                type: "boolean"
            }),
            new TableColumn({
                name: "created_at",
                type: "timestamp"
            }),
            new TableColumn({
                name: "updated_at",
                type: "timestamp"
            })
        ],



        )

        await queryRunner.createForeignKey("products", new TableForeignKey({
            name: "FKProductsUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["vendor_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("products", [
            "vendor_id",
            "quantity",
            "available",
            "created_at",
            "updated_at",

        ])

        await queryRunner.dropForeignKey("products", "FKProductsUser")
    }

}
