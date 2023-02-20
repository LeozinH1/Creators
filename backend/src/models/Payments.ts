import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('payments')
class Payments {
    @PrimaryColumn()
    id: string

    @Column()
    subscription_id: string

    @Column()
    creator_id: string

    @Column()
    total: number

    @Column()
    transaction_fee: number

    @Column()
    currency: string

    @Column()
    paid: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Payments
