import { EntityRepository, Repository } from 'typeorm'
import { validate } from 'uuid'
import Users from '../models/Users'

@EntityRepository(Users)
class UsersRepository extends Repository<Users> {
    public async getUser(url_id: string): Promise<Users | null> {
        const isUuid = validate(url_id)

        if (isUuid) {
            const user = await this.findOne(url_id)
            return user || null
        }

        const user = await this.findOne({
            where: {
                custom_url: url_id,
            },
        })

        return user || null
    }
}

export default UsersRepository
