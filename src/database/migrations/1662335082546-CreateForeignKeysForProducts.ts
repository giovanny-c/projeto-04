import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class CreateForeignKeysForProducts1662335082546 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("products",
            new TableForeignKey({

                name: "FKProductsCategory",
                referencedTableName: "categories",
                referencedColumnNames: ["id"],
                columnNames: ["category_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
//se deletar ou alterar uma category vai setar o campo dela como null em products.category_id
            }),

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("products", "FKProductsCategory")
    }

}
