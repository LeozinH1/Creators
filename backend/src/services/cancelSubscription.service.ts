import { getRepository } from 'typeorm'
import api from './api'

import AppError from '../errors/AppError'
import Subscriptions from '../models/Subscriptions'

interface Request {
    subscription_id: string
    reason: string
}

class CancelSubscriptionService {
    public async execute({
        subscription_id,
        reason,
    }: Request): Promise<Subscriptions> {
        const subscriptionsRepository = getRepository(Subscriptions)

        if (!subscription_id) {
            throw new AppError('Missing subscription id.')
        }

        const subscription = await subscriptionsRepository.findOne({
            where: {
                id: subscription_id,
            },
        })

        if (!subscription) {
            throw new AppError('Subscription not found.', 404)
        }

        if (subscription.status !== 'ACTIVE') {
            throw new AppError('The subscription is not active.')
        }

        const response = await api.post(
            `/billing/subscriptions/${subscription.id}/cancel`,
            {
                reason,
            },
        )

        if (response.status !== 204) {
            throw new AppError(
                'An error occurred when canceling a subscription.',
                response.status,
            )
        }

        subscription.status = 'CANCELLED'
        subscription.cancel_reason = reason
        subscription.approve_link = ''

        const subscriptionUpdated = await subscriptionsRepository.save(
            subscription,
        )

        return subscriptionUpdated
    }
}

export default CancelSubscriptionService
