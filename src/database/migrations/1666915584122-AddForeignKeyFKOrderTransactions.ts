import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AddForeignKeyFKOrderTransactions1666915584122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

 

        await queryRunner.createForeignKey("transactions", new TableForeignKey({
            name: "FKOrderTransactions",
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            columnNames: ["order_id"]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("transactions", "FKOrderTransactions")
        
    }

}
