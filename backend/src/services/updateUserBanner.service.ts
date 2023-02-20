import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import AppError from '../errors/AppError'
import uploadConfig from '../config/upload'
import User from '../models/Users'

interface Request {
    user_id: string
    imageFilename: string
}

class UpdateUserBannerService {
    public async execute({ user_id, imageFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne(user_id)

        if (!user) {
            throw new AppError('Only authenticated user can change banner', 401)
        }

        if (user.banner) {
            const userBannerFilePath = path.join(
                uploadConfig.directory,
                user.banner,
            )
            const userBannerFileExists = await fs.promises.stat(
                userBannerFilePath,
            )

            if (userBannerFileExists) {
                await fs.promises.unlink(userBannerFilePath)
            }
        }

        user.banner = imageFilename

        await usersRepository.save(user)

        return user
    }
}

export default UpdateUserBannerService
