import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Subscriptions from '../models/Subscriptions'

interface Request {
    id: string
    status: string
    next_billing: Date
    payer_id: string
}

class ActiveSubscriptionService {
    public async execute({
        id,
        status,
        next_billing,
        payer_id,
    }: Request): Promise<Subscriptions> {
        const subscriptionRepository = getRepository(Subscriptions)

        if (!id || !status || !next_billing || !payer_id) {
            throw new AppError('Missing fields.')
        }

        const subscription = await subscriptionRepository.findOne({
            where: {
                id,
            },
        })

        if (!subscription) {
            throw new AppError('Subscription not found.', 404)
        }

        const newSubscription = await subscriptionRepository.save({
            id: subscription.id,
            approve_link: '',
            status,
            next_billing,
            payer_id,
        })

        return newSubscription
    }
}

export default ActiveSubscriptionService
