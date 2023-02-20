import { getRepository } from 'typeorm'
import { hash, genSalt } from 'bcryptjs'
import { randomBytes } from 'crypto'
import AppError from '../errors/AppError'
import User from '../models/Users'

interface Request {
    name: string
    email: string
    password: string
    passwordConfirmation: string
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
        passwordConfirmation,
    }: Request): Promise<User> {
        const usersRepository = getRepository(User)

        if (!name || !email || !password || !passwordConfirmation) {
            throw new AppError('Missing fields.')
        }

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        })

        if (checkUserExists) {
            throw new AppError('Email address already used.')
        }

        if (password !== passwordConfirmation) {
            throw new AppError('Passwords do not match.')
        }

        const userSalt = await genSalt()

        const hashedPassword = await hash(password, userSalt)

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            salt: userSalt,
            confirmationToken: randomBytes(32).toString('hex'),
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService
