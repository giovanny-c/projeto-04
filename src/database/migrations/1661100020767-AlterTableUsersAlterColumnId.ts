import { type } from "os"
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterTableUsersAlterColumnId1661100020767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.changeColumn("users", "id", new TableColumn({
            name: "id",
            type: "uuid",
            isPrimary: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("users", "id", new TableColumn({
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "uuid",
            default: 'uuid_generate_v4()',
        }))
    }

}
