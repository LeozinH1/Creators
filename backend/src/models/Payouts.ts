import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('payouts')
class Payouts {
    @PrimaryColumn()
    id: string

    @Column()
    creator_id: string

    @Column()
    status: 'COMPLETED' | 'DENIED' | 'PENDING'

    @Column()
    pix: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Payouts
