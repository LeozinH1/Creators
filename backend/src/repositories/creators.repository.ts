import { EntityRepository, Repository } from 'typeorm'

import { validate } from 'uuid'

import Creators from '../models/Creators'

@EntityRepository(Creators)
class CreatorsRepository extends Repository<Creators> {
    public async findByUser(user_id: string): Promise<Creators | null> {
        const findCreator = await this.findOne({
            where: { user_id },
        })

        return findCreator || null
    }

    public async getCreator(url_id: string): Promise<Creators | null> {
        const isUuid = validate(url_id)

        if (isUuid) {
            const creator = await this.findOne(url_id)

            return creator || null
        }

        const creator = await this.findOne({
            where: {
                custom_url: url_id,
            },
        })

        return creator || null
    }
}

export default CreatorsRepository
