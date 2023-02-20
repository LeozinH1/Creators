import { getCustomRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import AppError from '../errors/AppError'
import uploadConfig from '../config/upload'
import CreatorsRepository from '../repositories/creators.repository'
import Creator from '../models/Creators'

interface Request {
    user_id: string
    imageFilename: string
}

class UpdateCreatorBannerService {
    public async execute({
        user_id,
        imageFilename,
    }: Request): Promise<Creator> {
        const creatorsRepository = getCustomRepository(CreatorsRepository)

        const creator = await creatorsRepository.findByUser(user_id)

        if (!creator) {
            throw new AppError('Creator not found')
        }

        if (creator.banner) {
            const creatorBannerFilePath = path.join(
                uploadConfig.directory,
                creator.banner,
            )
            const creatorBannerFileExists = await fs.promises.stat(
                creatorBannerFilePath,
            )

            if (creatorBannerFileExists) {
                await fs.promises.unlink(creatorBannerFilePath)
            }
        }

        creator.banner = imageFilename

        await creatorsRepository.save(creator)

        return creator
    }
}

export default UpdateCreatorBannerService
