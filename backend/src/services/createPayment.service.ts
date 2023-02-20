import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Payments from '../models/Payments'
import Subscriptions from '../models/Subscriptions'

interface Request {
    payment_id: string
    total: number
    transaction_fee: number
    currency: string
    subscription_id: string
}

class CreatePaymentService {
    public async execute({
        payment_id,
        total,
        transaction_fee,
        currency,
        subscription_id,
    }: Request): Promise<Payments> {
        const paymentRepository = getRepository(Payments)
        const subscriptionsRepository = getRepository(Subscriptions)

        if (!payment_id || !total || !transaction_fee || !subscription_id) {
            throw new AppError('Missing fields.')
        }

        const subscription = await subscriptionsRepository.findOne({
            where: {
                id: subscription_id,
            },
        })

        if (!subscription) throw new AppError('Subscription not found.')

        const payment = await paymentRepository.save({
            id: payment_id,
            total,
            transaction_fee,
            currency,
            subscription_id,
            creator_id: subscription.creator_id,
        })

        return payment
    }
}

export default CreatePaymentService
