import { Router } from 'express'
import { getRepository, getCustomRepository } from 'typeorm'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import isAuthenticated from '../middlewares/ensureAuthenticated'
import Posts from '../models/Posts'
import PostsLikes from '../models/PostsLikes'
import AppError from '../errors/AppError'
import CreatorsRepository from '../repositories/creators.repository'
import IsSubscriberService from '../services/isSubscriber.service'
import uploadConfig from '../config/upload'

const upload = multer(uploadConfig)

const postsRoute = Router()

// LIST CREATOR POSTS

postsRoute.get('/:creator_id/:click', async (request, response) => {
    const { creator_id, click } = request.params
    const authHeader = request.headers.authorization
    const isSubscriberService = new IsSubscriberService()
    const creatorsRepository = getCustomRepository(CreatorsRepository)
    const creator = await creatorsRepository.getCreator(creator_id)
    const postsRepository = getRepository(Posts)
    if (!creator) throw new AppError('Creator not found.')

    if (authHeader) {
        isAuthenticated(request, response, async () => {
            const user_id = request.user.id
            const isSubscriber = await isSubscriberService.execute({
                user_id,
                creator_id,
            })

            const take = 5
            const skip = take * Number(click) - take
            let results = 0

            // IF USER IS SUBSCRIBER OR OWNER
            if (isSubscriber || creator.user_id === user_id) {
                results = await postsRepository.count({
                    where: {
                        creator_id: creator.id,
                    },
                })
            } else {
                results = await postsRepository.count({
                    where: {
                        creator_id: creator.id,
                        public: true,
                    },
                })
            }

            const total_pages = Math.ceil(results / take)

            let posts

            // IF USER IS SUBSCRIBER OR OWNER
            if (isSubscriber || creator.user_id === user_id) {
                posts = await postsRepository.find({
                    where: {
                        creator_id: creator.id,
                    },
                    order: { created_at: 'DESC' },
                    relations: ['likes'],
                    skip,
                    take,
                })
            } else {
                posts = await postsRepository.find({
                    where: {
                        creator_id: creator.id,
                        public: true,
                    },
                    order: { created_at: 'DESC' },
                    relations: ['likes'],
                    skip,
                    take,
                })
            }

            return response.json({ posts, results, click, total_pages })
        })
    } else {
        const take = 5
        const skip = take * Number(click) - take
        const results = await postsRepository.count({
            where: {
                creator_id: creator.id,
                public: true,
            },
        })

        const total_pages = Math.ceil(results / take)

        const posts = await postsRepository.find({
            where: {
                creator_id: creator.id,
                public: true,
            },
            order: { created_at: 'DESC' },
            relations: ['likes'],
            skip,
            take,
        })

        return response.json({ posts, results, click, total_pages })
    }
})

// CREATE POST

postsRoute.post(
    '/',
    isAuthenticated,
    upload.single('banner'),
    async (request, response) => {
        const { title, body, isPublic } = JSON.parse(request.body.data)

        const user_id = request.user.id
        if (!user_id) throw new AppError('User id not found')

        const creatorsRepository = getCustomRepository(CreatorsRepository)
        const creator = await creatorsRepository.findByUser(user_id)
        if (!creator) throw new AppError('Creator id not found')

        const postsRepository = getRepository(Posts)

        await postsRepository.save({
            creator_id: creator.id,
            banner: request.file?.filename,
            title,
            body,
            public: isPublic,
        })

        const lastInserted = await postsRepository.findOne({
            order: { created_at: 'DESC' },
        })

        return response.json(lastInserted)
    },
)

// DELETE POST

postsRoute.delete('/:post_id', isAuthenticated, async (request, response) => {
    const { post_id } = request.params

    // Get user
    const user_id = request.user.id
    if (!user_id) throw new AppError('User id not found')

    // Get post
    const postsRepository = getRepository(Posts)
    const post = await postsRepository.findOne(post_id)
    if (!post) throw new AppError('Post not found')

    // Get Creator
    const creatorsRepository = getCustomRepository(CreatorsRepository)
    const creator = await creatorsRepository.findByUser(user_id)
    if (!creator) throw new AppError('Creator id not found')

    // Check if user not is owner of post
    if (post.creator_id !== creator.id) {
        throw new AppError('Acesso negado', 401)
    }

    // Delete banner file
    if (post.banner) {
        const postBannerFilePath = path.join(
            uploadConfig.directory,
            post.banner,
        )
        const userBannerFileExists = await fs.promises.stat(postBannerFilePath)

        if (userBannerFileExists) {
            await fs.promises.unlink(postBannerFilePath)
        }
    }

    // Delete post
    await postsRepository.delete(post_id)

    return response.json({})
})

// LIKE POST

postsRoute.post(
    '/like/:post_id',
    isAuthenticated,
    async (request, response) => {
        const { post_id } = request.params
        const user_id = request.user.id

        const postsLikesRepository = getRepository(PostsLikes)

        const likeExists = await postsLikesRepository.findOne({
            where: {
                postId: post_id,
                user_id,
            },
        })

        if (likeExists) {
            throw new AppError('Você já curtiu este post.')
        }

        await postsLikesRepository.save({
            postId: post_id,
            user_id,
        })

        const postsRepository = getRepository(Posts)
        const post = await postsRepository.findOne({
            where: {
                id: post_id,
            },
            relations: ['likes'],
        })

        return response.status(201).json(post)
    },
)

// UNLIKE POST

postsRoute.post(
    '/unlike/:post_id',
    isAuthenticated,
    async (request, response) => {
        const { post_id } = request.params
        const user_id = request.user.id

        const postsLikesRepository = getRepository(PostsLikes)

        const likeExists = await postsLikesRepository.findOne({
            where: {
                postId: post_id,
                user_id,
            },
        })

        if (!likeExists) {
            throw new AppError('Você não curtiu este post.')
        }

        await postsLikesRepository.delete(likeExists.id)

        const postsRepository = getRepository(Posts)
        const post = await postsRepository.findOne({
            where: {
                id: post_id,
            },
            relations: ['likes'],
        })

        return response.json(post)
    },
)

export default postsRoute
