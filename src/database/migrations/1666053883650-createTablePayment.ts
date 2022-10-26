import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTablePayment1666053883650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "transactions",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {// del?
                
                    name: "transaction_id",
                    type: "varchar",
                    
                },
                {
                    name: "transaction_code",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "status",
                    type: "varchar",
                    enum: [
                        "started",
                        "processing",
                        "pending",
                        "approved",
                        "refused",
                        "refunded",
                        "chargeback",
                        "error"
                    ],
                    isNullable: false
                },
                {
                    name: "payment_type",
                    type: "varchar",
                    enum: [
                        "billet",
                        "credit_cart",
                        "pix",
                        "other"
                    ],
                    isNullable: false,
                },
                {
                    name: "installments",
                    type: "numeric",
                },
                {
                    name: "total",
                    type: "decimal",
                    precision: 10,
                    scale: 2
                },
                {
                    name: "processor_response",
                    type: "varchar",
                    
                },
                {
                    name: "order_id",
                    type: "uuid"
                },
                {
                    name: "vendor_id",
                    type: "uuid",
                    isNullable: true
                    
                },
                {
                    name: "customer_id",
                    type: "uuid",
                    
                },
                {
                    name: "customer_email",
                    type: "varchar",
                    
                },
                {
                    name: "customer_name",
                    type: "varchar",
                    
                },
                {
                    name: "customer_mobile",
                    type: "varchar",
                    
                },
                {
                    name: "customer_document",
                    type: "varchar",
                    
                },
                {
                    name: "billing_address",
                    type: "varchar",
                    
                },
                {
                    name: "billing_number",
                    type: "varchar",
                    
                },
                {
                    name: "billing_neighborhood",
                    type: "varchar",
                    
                },
                {
                    name: "billing_city",
                    type: "varchar",
                    
                },
                {
                    name: "billing_state",
                    type: "varchar",
                    
                },
                {
                    name: "billing_zipcode",
                    type: "varchar",
                    
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
                    name: "FKCustomersTransactions",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["customer_id"],
                    onDelete: "SET NULL"
                },

                {
                    name: "FKVendorsTransactions",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["vendor_id"],
                    onDelete: "SET NULL"
                },

                {
                    name: "FKOrdersTransactions",
                    referencedTableName: "orders",
                    referencedColumnNames: ["id"],
                    columnNames: ["order_id"],
                    onDelete: "SET NULL"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions")
    }

}
