import { MigrationInterface, QueryRunner, Table } from 'typeorm'

class CreateSubscriptions1631659820486 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'subscriptions',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'creator_id',
                        type: 'uuid',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },
                    {
                        name: 'approve_link',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'next_billing',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'cancel_reason',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'payer_id',
                        type: 'varchar',
                        isNullable: true,
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
        await queryRunner.dropTable('subscriptions')
    }
}

export default CreateSubscriptions1631659820486
