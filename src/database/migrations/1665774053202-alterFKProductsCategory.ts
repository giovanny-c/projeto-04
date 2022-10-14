import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class alterFKProductsCategory1665774053202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("products", "FKProductsCategory")
        
        await queryRunner.createForeignKey("products",
        new TableForeignKey({

            name: "FKProductsCategory",
            referencedTableName: "categories",
            referencedColumnNames: ["id"],
            columnNames: ["category_id"],
            onDelete: "SET NULL",
//se deletar ou alterar uma category vai setar o campo dela como null em products.category_id
        }),
        
        )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("products", "FKProductsCategory")

    }

}
