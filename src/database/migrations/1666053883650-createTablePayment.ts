import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTablePayment1666053883650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "payments",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "user_id",
                    type: "uuid",
                },
                {
                    name: "payment_info",
                    type: "varchar",
                },
            ],

            foreignKeys: [{
                name: "FKUsersPayments",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL"
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments")
    }

}
