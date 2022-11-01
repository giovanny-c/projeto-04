import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createAddressesTable1667337328037 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "addresses",

            columns:[
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "address",
                    type: "varchar",
                },
                {
                    name: "address_number",
                    type: "varchar",
                },
                {
                    name: "neighborhood",
                    type: "varchar",
                },
                {
                    name: "city",
                    type: "varchar",
                },
                {
                    name: "state",
                    type: "varchar",
                },
                {
                    name: "country",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "zipcode",
                    type: "varchar",
                },
                {
                    name: "user_id",
                    type: "uuid",
                }
            ],

            foreignKeys: [
                {
                    name:"FKUsersAddress",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "SET NULL"
                }
            ]

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("addresses")
    }

}
