import { getRepository } from 'typeorm'
import api from './api'
import AppError from '../errors/AppError'

import Creators from '../models/Creators'
import Users from '../models/Users'
import Subscriptions from '../models/Subscriptions'

import paypal from '../config/paypal'

interface Request {
    creator_id: string
    user_id: string
}

interface Response {
    approve_link: string
}

/*

    SUBSCRIPTION RESPONSE STATUS:

    - APPROVAL_PENDING
    - APPROVED
    - ACTIVE


    - SUSPENDED
    - CANCELLED

*/

class CreateSubscriptionService {
    public async execute({ creator_id, user_id }: Request): Promise<Response> {
        const CreatorsRepository = getRepository(Creators)
        const UsersRepository = getRepository(Users)
        const SubscriptionsRepository = getRepository(Subscriptions)

        const creator = await CreatorsRepository.findOne({
            where: {
                id: creator_id,
            },
            select: ['plan_id'],
        })

        if (!creator) throw new AppError('Creator not found!')

        const existingSubscription = await SubscriptionsRepository.findOne({
            where: {
                creator_id,
                user_id,
            },
        })

        const userData = await UsersRepository.findOne({
            where: { id: user_id },
        })

        if (!userData) {
            throw new AppError('Error getting data of user.')
        }

        if (existingSubscription) {
            if (existingSubscription.status === 'APPROVAL_PENDING') {
                await SubscriptionsRepository.remove(existingSubscription)
            }

            if (existingSubscription.status === 'ACTIVE') {
                throw new AppError(
                    'Your subscription to this creator is active.',
                )
            }

            if (existingSubscription.status === 'CANCELLED') {
                if (existingSubscription.next_billing > new Date()) {
                    throw new AppError(
                        'Your subscription to this creator is active.',
                    )
                }
            }

            if (existingSubscription.status === 'APPROVED') {
                throw new AppError('Your subscription status is APPROVED.')
            }

            if (existingSubscription.status === 'SUSPENDED') {
                throw new AppError('Your subscription status is SUSPENDED.')
            }
        }

        const response = await api.post('/billing/subscriptions', {
            plan_id: creator.plan_id,
            subscriber: {
                name: {
                    given_name: userData.name,
                    surname: 'surname',
                },
                email_address: userData.email,
            },
            application_context: {
                brand_name: 'Creators Platform',
                locale: 'pt-BR',
                shipping_preference: 'NO_SHIPPING',
                user_action: 'SUBSCRIBE_NOW',
                payment_method: {
                    payer_selected: 'PAYPAL',
                    payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
                },
                return_url: paypal.config.return_url,
                cancel_url: paypal.config.cancel_url,
            },
        })

        if (response.status !== 201)
            throw new AppError('Error on create subscription')

        const approve_link = response.data.links[0].href

        await SubscriptionsRepository.save({
            id: response.data.id,
            creator_id,
            user_id,
            status: response.data.status,
            approve_link,
        })

        return {
            approve_link,
        }
    }
}

export default CreateSubscriptionService
