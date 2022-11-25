import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addColumnsOnProductsTable1669334113087 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("products", [
            new TableColumn({
                name: "shape",
                type: "varchar",
                isNullable: true,
            }),
            new TableColumn({
                name: "weight",
                type: "decimal",
                precision: 6,
                scale: 2,
                isNullable: true,
            }),
            new TableColumn({
                name: "lenght",
                type: "decimal",
                precision: 6,
                scale: 2,
                isNullable: true,
            }),
            new TableColumn({
                name: "height",
                type: "decimal",
                precision: 6,
                scale: 2,
                isNullable: true,
            }),
            new TableColumn({
                name: "width",
                type: "decimal",
                precision: 6,
                scale: 2,
                isNullable: true,
            }),
            new TableColumn({
                name: "diameter",
                type: "decimal",
                precision: 6,
                scale: 2,
                isNullable: true,
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("products", ["shape", "weight", "lenght", "height", "width", "diameter"])
    }

}
