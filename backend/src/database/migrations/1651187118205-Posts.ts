import { MigrationInterface, QueryRunner, Table } from 'typeorm'

class Posts1651187118205 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'posts',

                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'creator_id',
                        type: 'uuid',
                    },
                    {
                        name: 'banner',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'body',
                        type: 'varchar',
                    },
                    {
                        name: 'public',
                        type: 'boolean',
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
        await queryRunner.dropTable('posts')
    }
}

export default Posts1651187118205
