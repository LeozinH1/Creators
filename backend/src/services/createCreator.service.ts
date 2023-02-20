import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Creator from '../models/Creators'
import CreatePlanService from './createPlan.service'

interface Request {
    user_id: string
    creator_name: string
    description?: string
    price: number
}

class CreateCreatorService {
    public async execute({
        user_id,
        creator_name,
        description,
        price,
    }: Request): Promise<Creator> {
        const creatorRepository = getRepository(Creator)

        if (!user_id || !creator_name || !price) {
            throw new AppError('Missing fields.')
        }

        const checkCreatorExists = await creatorRepository.findOne({
            where: { user_id },
        })

        if (checkCreatorExists) {
            throw new AppError('This user already has a creator profile.')
        }

        if (price < 1 || price > 100) {
            throw new AppError('Price must be between 1 and 100.')
        }

        if (Number.isNaN(price)) {
            throw new AppError('Price is not a number.')
        }

        const createPlan = new CreatePlanService()
        const plan = await createPlan.execute({ creator_name, price })

        const creator = creatorRepository.create({
            user_id,
            creator_name,
            description,
            plan_id: plan.plan_id,
            price,
        })

        await creatorRepository.save(creator)

        return creator
    }
}

export default CreateCreatorService
