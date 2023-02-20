import { Router } from 'express'
import multer from 'multer'
import { getCustomRepository, getRepository } from 'typeorm'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'
import uploadConfig from '../config/upload'
import CreateUserService from '../services/createUser.service'
import CreateCreatorService from '../services/createCreator.service'
import UpdateUserBannerService from '../services/updateUserBanner.service'
import UpdateUserAvatarService from '../services/updateUserAvatar.service'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdatePasswordService from '../services/updatePassword.service'
import RememberPasswordService from '../services/rememberPassword.service'
import User from '../models/Users'
import AppError from '../errors/AppError'
import UsersRepository from '../repositories/users.repository'

const usersRoute = Router()
const upload = multer(uploadConfig)

// Create User Account

usersRoute.post('/', async (request, response) => {
    const { name, email, password, passwordConfirmation, isCreator, price } =
        request.body

    if (isCreator)
        if (price < 1 || price > 100)
            throw new AppError(
                'Valor mensal mínimo R$1,00 e máximo de R$100,00.',
            )

    // Create user account
    const createUser = new CreateUserService()
    const user = await createUser.execute({
        name,
        email,
        password,
        passwordConfirmation,
    })

    // Remove sensitive data
    delete user.password
    delete user.salt
    delete user.confirmationToken
    delete user.recoverToken

    // Create creator profile
    if (isCreator) {
        const createCreator = new CreateCreatorService()
        await createCreator.execute({
            user_id: user.id,
            creator_name: user.name,
            price,
        })
    }

    return response.json(user)
})

// Get User Info

usersRoute.get('/:user_id', async (request, response) => {
    const { user_id } = request.params
    const userRepository = getCustomRepository(UsersRepository)

    if (!user_id) {
        throw new AppError('empty user_id')
    }

    const user = await userRepository.getUser(user_id)

    if (!user) {
        throw new AppError('User not found!')
    }

    // Remove sensitive data
    delete user.password
    delete user.salt
    delete user.confirmationToken
    delete user.recoverToken

    return response.json(user)
})

// Update User Banner

usersRoute.patch(
    '/banner',
    ensureAuthenticated,
    upload.single('banner'),
    async (request, response) => {
        const updateUserBanner = new UpdateUserBannerService()

        if (!request.file) {
            throw new AppError('File not found.')
        }

        const user = await updateUserBanner.execute({
            user_id: request.user.id,
            imageFilename: request.file.filename,
        })

        // Remove sensitive data
        delete user.password
        delete user.salt
        delete user.confirmationToken
        delete user.recoverToken

        return response.json(user)
    },
)

// Update User Avatar

usersRoute.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService()

        if (!request.file) {
            throw new AppError('File not found.')
        }

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            imageFilename: request.file.filename,
        })

        // Remove sensitive data
        delete user.password
        delete user.salt
        delete user.confirmationToken
        delete user.recoverToken

        return response.json(user)
    },
)

// Update User Info

usersRoute.post('/update', ensureAuthenticated, async (request, response) => {
    const user_id = request.user.id
    const { name, custom_url, description } = request.body
    const userRepository = getRepository(User)

    if (!user_id) {
        throw new AppError('empty user_id')
    }

    if (!name && !description && !custom_url) {
        throw new AppError('No data received!')
    }

    const user = await userRepository.findOne(user_id)

    if (!user) {
        throw new AppError('User not found!')
    }

    if (name) user.name = name
    if (custom_url) user.custom_url = custom_url
    if (description) user.description = description

    userRepository.save(user)

    // Remove sensitive data
    delete user.password
    delete user.salt
    delete user.confirmationToken
    delete user.recoverToken

    return response.json(user)
})

// Change Password

usersRoute.post(
    '/update/password',
    ensureAuthenticated,
    async (request, response) => {
        const user_id = request.user.id
        const { old_pass, new_pass, conf_pass } = request.body

        const updatePasswordService = new UpdatePasswordService()
        const updatePassword = await updatePasswordService.execute({
            user_id,
            old_pass,
            new_pass,
            conf_pass,
            recoverPass: false,
        })

        return response.json(updatePassword)
    },
)

// Generate recover token

usersRoute.post('/remember/password', async (request, response) => {
    const { user_email } = request.body

    const rememberPasswordService = new RememberPasswordService()
    await rememberPasswordService.execute({
        user_email,
    })

    return response.json({ success: true })
})

// Reset Password

usersRoute.post('/reset/password', async (request, response) => {
    const { recoverToken, new_pass, conf_pass } = request.body

    const usersRepository = getRepository(User)
    const userAccount = await usersRepository.findOne({
        where: { recoverToken },
    })

    if (!userAccount) throw new AppError('Token de recuperação inválido.')

    verify(
        recoverToken,
        authConfig.recoverToken.secret,
        (err: any, decoded: any) => {
            if (err) {
                throw new AppError('Token de recuperação inválido.')
            }
        },
    )

    userAccount.recoverToken = ''
    usersRepository.save(userAccount)

    const updatePasswordService = new UpdatePasswordService()
    const updatePassword = await updatePasswordService.execute({
        user_id: userAccount.id,
        new_pass,
        conf_pass,
        recoverPass: true,
    })

    return response.json(updatePassword)
})

export default usersRoute
