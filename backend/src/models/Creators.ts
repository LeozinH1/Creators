import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('creators')
class Creators {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    user_id: string

    @Column()
    creator_name: string

    @Column()
    description: string

    @Column()
    avatar: string

    @Column()
    banner: string

    @Column()
    plan_id: string

    @Column()
    price: number

    @Column()
    custom_url: string

    @Column()
    google_ua: string

    @Column()
    status: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Creators
