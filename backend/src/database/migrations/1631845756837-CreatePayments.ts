import { MigrationInterface, QueryRunner, Table } from 'typeorm'

class CreatePayments1631845756837 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'payments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'subscription_id',
                        type: 'varchar',
                    },
                    {
                        name: 'creator_id',
                        type: 'varchar',
                    },
                    {
                        name: 'total',
                        type: 'numeric',
                    },
                    {
                        name: 'transaction_fee',
                        type: 'numeric',
                    },
                    {
                        name: 'currency',
                        type: 'varchar',
                    },
                    {
                        name: 'paid',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payments')
    }
}

export default CreatePayments1631845756837
