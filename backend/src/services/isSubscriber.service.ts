import { getRepository, getCustomRepository, MoreThan } from 'typeorm'
import Subscriptions from '../models/Subscriptions'
import CreatorsRepository from '../repositories/creators.repository'
import AppError from '../errors/AppError'

interface Request {
    user_id: string
    creator_id: string
}

class IsSubscriberService {
    public async execute({ user_id, creator_id }: Request): Promise<boolean> {
        const subscriptionsRepository = getRepository(Subscriptions)
        const creatorsRepository = getCustomRepository(CreatorsRepository)
        const creator = await creatorsRepository.getCreator(creator_id)

        if (!creator) {
            throw new AppError('Creator not found')
        }

        const subscription = await subscriptionsRepository
            .createQueryBuilder('subscriptions')
            .where({ creator_id: creator.id })
            .andWhere({ user_id })
            .andWhere({ next_billing: MoreThan(new Date()) })
            .getOne()

        if (subscription) {
            return true
        }

        return false
    }
}

export default IsSubscriberService
