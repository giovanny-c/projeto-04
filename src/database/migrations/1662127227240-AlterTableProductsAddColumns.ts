import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableProductsAddColumns1662127227240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("products", [
            new TableColumn({
                name: "category_id",
                type: "uuid",
                isNullable: true
            }),
            new TableColumn({
                name: "rating",
                type: "numeric",
                isNullable: true
            }),
            new TableColumn({
                name: "votes",
                type: "numeric",
                isNullable: true
            }),
            new TableColumn({
                name: "sells",
                type: "numeric",
                isNullable: true
            }),

        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("products", ["category_id", "rating", "sells", "votes"])
    }

}
