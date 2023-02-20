import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('users')
class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    banner?: string

    @Column()
    avatar?: string

    @Column()
    custom_url?: string

    @Column()
    description?: string

    @Column()
    password?: string

    @Column()
    salt?: string

    @Column()
    confirmationToken?: string

    @Column()
    recoverToken?: string

    @Column()
    status: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Users
