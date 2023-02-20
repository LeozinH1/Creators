import { Router } from 'express'
import { getRepository, getCustomRepository, MoreThan } from 'typeorm'
import isAuthenticated from '../middlewares/ensureAuthenticated'
import CreateSubscriptionService from '../services/createSubscription.service'
import CancelSubscriptionService from '../services/cancelSubscription.service'
import Subscriptions from '../models/Subscriptions'
import CreatorsRepository from '../repositories/creators.repository'
import AppError from '../errors/AppError'
import UsersRepository from '../repositories/users.repository'
import IsSubscriberService from '../services/isSubscriber.service'

const subscribeRoute = Router()

// CREATE SUBSCRIPTION

subscribeRoute.post(
    '/:creator_id',
    isAuthenticated,
    async (request, response) => {
        const { creator_id } = request.params

        const creatorsRepository = getCustomRepository(CreatorsRepository)
        const creator = await creatorsRepository.getCreator(creator_id)

        if (!creator) {
            throw new AppError('Creator not found')
        }

        const subscriptionService = new CreateSubscriptionService()
        const subscription = await subscriptionService.execute({
            creator_id: creator.id,
            user_id: request.user.id,
        })
        return response.json(subscription)
    },
)

// CANCEL SUBSCRIPTION

subscribeRoute.post(
    '/:subscription_id/cancel',
    isAuthenticated,
    async (request, response) => {
        const { subscription_id } = request.params
        const { reason } = request.body

        const cancelSubscriptionService = new CancelSubscriptionService()
        const cancelSubscription = await cancelSubscriptionService.execute({
            subscription_id,
            reason,
        })

        return response.json(cancelSubscription)
    },
)

// CHECK IF USER IS MEMBER OF CREATOR

subscribeRoute.get(
    '/:creator_id/ismember',
    isAuthenticated,
    async (request, response) => {
        const { creator_id } = request.params
        const user_id = request.user.id

        const isSubscriberService = new IsSubscriberService()
        const isSubscriber = await isSubscriberService.execute({
            user_id,
            creator_id,
        })

        return response.json({
            is_member: isSubscriber,
        })
    },
)

// LIST USER SUBSCRIPTIONS

subscribeRoute.get('/', isAuthenticated, async (request, response) => {
    const user_id = request.user.id
    const subscriptionsRepository = getRepository(Subscriptions)

    const subscriptions = await subscriptionsRepository.find({
        where: {
            user_id,
            next_billing: MoreThan(new Date()),
        },
        order: {
            next_billing: 'ASC',
        },
        relations: ['creator_id'],
    })

    return response.json(subscriptions)
})

// MEMBER CREATORS LIST

subscribeRoute.get('/:user_id/subscriptions', async (request, response) => {
    const subscriptionsRepository = getRepository(Subscriptions)
    const { user_id } = request.params

    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.getUser(user_id)

    if (!user) {
        throw new AppError('User not found')
    }

    const subscriptions = await subscriptionsRepository.find({
        where: {
            user_id: user.id,
            next_billing: MoreThan(new Date()),
        },
        order: {
            next_billing: 'ASC',
        },
        relations: ['creator_id'],
        select: ['creator_id'],
    })

    return response.json(subscriptions)
})

// CREATOR MEMBERS LIST

subscribeRoute.get('/:creator_id/members', async (request, response) => {
    const subscriptionsRepository = getRepository(Subscriptions)
    const { creator_id } = request.params

    const creatorsRepository = getCustomRepository(CreatorsRepository)
    const creator = await creatorsRepository.getCreator(creator_id)

    if (!creator) {
        throw new AppError('Creator not found')
    }

    const subscriptions = await subscriptionsRepository.find({
        where: {
            creator_id: creator.id,
            next_billing: MoreThan(new Date()),
        },
        order: {
            next_billing: 'ASC',
        },
        relations: ['user_id'],
        select: ['user_id'],
    })

    return response.json(subscriptions)
})

export default subscribeRoute
