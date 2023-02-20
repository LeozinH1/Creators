import { Router } from 'express'

import { getRepository, getCustomRepository } from 'typeorm'
import CreatorsRepository from '../repositories/creators.repository'
import AuthenticateUserService from '../services/authenticateUser.service'
import isAuthenticated from '../middlewares/ensureAuthenticated'
import User from '../models/Users'
import AppError from '../errors/AppError'

const sessionsRoute = Router()

// Login

sessionsRoute.post('/', async (request, response) => {
    const { email, password } = request.body

    // Authenticate user
    const authenticateUser = new AuthenticateUserService()
    const { user, token } = await authenticateUser.execute({
        email,
        password,
    })

    // Remove sensitive data
    delete user.password
    delete user.salt
    delete user.confirmationToken
    delete user.recoverToken

    // Get Creator Profile
    const creatorsRepository = getCustomRepository(CreatorsRepository)
    const creator = await creatorsRepository.findByUser(user.id)

    return response.json({ user, creator, token })
})

// Get Me

sessionsRoute.get('/', isAuthenticated, async (request, response) => {
    const user_id = request.user.id
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(user_id)

    if (!user) {
        throw new AppError('User not found!')
    }

    // Remove sensitive data
    delete user.password
    delete user.salt
    delete user.confirmationToken
    delete user.recoverToken

    const creatorsRepository = getCustomRepository(CreatorsRepository)
    const creator = await creatorsRepository.findByUser(user.id)

    return response.json({ user, creator })
})

export default sessionsRoute
