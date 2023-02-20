import { Router } from 'express'
import multer from 'multer'
import { getCustomRepository, getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import isAuthenticated from '../middlewares/ensureAuthenticated'
import CreateCreatorService from '../services/createCreator.service'
import CreatorsRepository from '../repositories/creators.repository'
import AppError from '../errors/AppError'
import UsersRepository from '../repositories/users.repository'
import UpdatePriceService from '../services/updatePrice.service'
import uploadConfig from '../config/upload'
import UpdateCreatorAvatarService from '../services/updateCreatorAvatar.service'
import PayoutRequestService from '../services/payoutRequest.service'
import UpdateCreatorBannerService from '../services/updateCreatorBanner.service'
import Users from '../models/Users'
import Payments from '../models/Payments'
import Payouts from '../models/Payouts'

const creatorsRoute = Router()
const upload = multer(uploadConfig)

// CREATE NEW CREATOR PROFILE

creatorsRoute.post('/', isAuthenticated, async (request, response) => {
    const { creator_name, description, price } = request.body
    const createCreator = new CreateCreatorService()

    const creator = await createCreator.execute({
        user_id: request.user.id,
        creator_name,
        description,
        price,
    })

    return response.json(creator)
})

// VIEW CREATOR

creatorsRoute.get('/:creator_id', async (request, response) => {
    const creatorsRepository = getCustomRepository(CreatorsRepository)

    const { creator_id } = request.params
    if (!creator_id) throw new AppError('Creator id not found')

    const creator = await creatorsRepository.getCreator(creator_id)

    return response.json(creator) || null
})

// FIND BY USER ID

creatorsRoute.get('/user/:user_id', async (request, response) => {
    const creatorsRepository = getCustomRepository(CreatorsRepository)
    const usersRepository = getCustomRepository(UsersRepository)

    const { user_id } = request.params
    if (!user_id) throw new AppError('User id not found!')

    const user = await usersRepository.getUser(user_id)
    if (!user) {
        throw new AppError('User not found')
    }

    const creator = await creatorsRepository.findByUser(user.id)

    return response.json(creator)
})

// PAYOUT

creatorsRoute.post('/payout', isAuthenticated, async (request, response) => {
    const user_id = request.user.id
    const { pix, pass } = request.body

    if (!pix) throw new AppError('Informe sua chave pix.')
    if (!user_id) throw new AppError('User id not found')
    if (!pass) throw new AppError('Informe sua senha da plataforma.')

    const creatorsRepository = getCustomRepository(CreatorsRepository)
    const creator = await creatorsRepository.findByUser(user_id)
    if (!creator) throw new AppError('Creator id not found')

    // Validate password
    const usersRepository = getRepository(Users)
    const user = await usersRepository.findOne(user_id)
    if (!user) throw new AppError('Usuário não encontrado.', 404)
    const hashedPass = await bcrypt.hash(pass, String(user.salt))
    if (hashedPass !== user.password)
        throw new AppError('Senha incorreta.', 401)

    // Handle payout
    const payoutRequestService = new PayoutRequestService()
    await payoutRequestService.execute({
        creator_id: creator.id,
        pix,
    })

    return response.json({})
})

// PAYOUT STATUS

creatorsRoute.get(
    '/payout/status',
    isAuthenticated,
    async (request, response) => {
        const user_id = request.user.id

        if (!user_id) throw new AppError('User id not found')

        const creatorsRepository = getCustomRepository(CreatorsRepository)
        const creator = await creatorsRepository.findByUser(user_id)
        if (!creator) throw new AppError('Creator id not found')

        // Handle status
        const payoutsRepository = getRepository(Payouts)

        const pendingPayout = await payoutsRepository.findOne({
            creator_id: creator.id,
            status: 'PENDING',
        })

        if (pendingPayout) {
            return response.json({ pending: true })
        }

        return response.json({ pending: false })
    },
)

// CREATOR EARNINGS

creatorsRoute.get(
    '/earnings/view',
    isAuthenticated,
    async (request, response) => {
        const user_id = request.user.id

        if (!user_id) throw new AppError('User id not found')

        const creatorsRepository = getCustomRepository(CreatorsRepository)
        const creator = await creatorsRepository.findByUser(user_id)
        if (!creator) throw new AppError('Creator id not found')

        const paymentsRepository = getRepository(Payments)

        const payouts = await paymentsRepository.find({
            creator_id: creator.id,
            paid: true,
        })

        const payments = await paymentsRepository.find({
            creator_id: creator.id,
            paid: false,
        })

        const payoutTotal = payouts.reduce((acc, curr) => {
            return acc + curr.total
        }, 0)

        const paymentTotal = payments.reduce((acc, curr) => {
            return acc + curr.total
        }, 0)

        return response.json({ payments: paymentTotal, payouts: payoutTotal })
    },
)

// UPDATE DATA

creatorsRoute.post('/update', isAuthenticated, async (request, response) => {
    const user_id = request.user.id
    if (!user_id) throw new AppError('User id not found', 404)

    const { name, description, url, price, ua } = request.body
    if (!name && !description && !url && !price && !ua)
        throw new AppError('Empty data')

    const creatorsRepository = getCustomRepository(CreatorsRepository)
    const creator = await creatorsRepository.findByUser(user_id)
    if (!creator) throw new AppError('Creator not found', 404)

    if (name) creator.creator_name = name
    if (description) creator.description = description
    if (url) {
        const urlExists = await creatorsRepository.findOne({
            where: {
                custom_url: url,
            },
        })

        if (urlExists) {
            throw new AppError('This url already exists', 500)
        } else {
            creator.custom_url = url
        }
    }
    if (ua) creator.google_ua = ua
    if (price) {
        const updatePriceService = new UpdatePriceService()
        const updatePrice = await updatePriceService.execute({
            new_price: price,
            plan_id: creator.plan_id,
        })

        if (updatePrice.status === 204) creator.price = price
    }

    await creatorsRepository.save(creator)

    return response.json(creator)
})

// Update Creator Banner

creatorsRoute.patch(
    '/banner',
    isAuthenticated,
    upload.single('banner'),
    async (request, response) => {
        const updateCreatorBanner = new UpdateCreatorBannerService()

        if (!request.file) {
            throw new AppError('File not found.')
        }

        const creator = await updateCreatorBanner.execute({
            user_id: request.user.id,
            imageFilename: request.file.filename,
        })

        return response.json(creator)
    },
)

// Update Creator Avatar

creatorsRoute.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateCreatorAvatar = new UpdateCreatorAvatarService()

        if (!request.file) {
            throw new AppError('File not found.')
        }

        const creator = await updateCreatorAvatar.execute({
            user_id: request.user.id,
            imageFilename: request.file.filename,
        })

        return response.json(creator)
    },
)

export default creatorsRoute
