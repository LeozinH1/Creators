import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'

import User from './Users'
import Creator from './Creators'

@Entity('subscriptions')
class Subscriptions {
    @PrimaryColumn()
    id: string

    @OneToOne(() => Creator, creator => creator.id)
    @JoinColumn({ name: 'creator_id' })
    @Column()
    creator_id: string

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    @Column()
    user_id: string

    @Column()
    status: string

    @Column()
    approve_link: string

    @Column()
    next_billing: Date

    @Column()
    cancel_reason: string

    @Column()
    payer_id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Subscriptions
