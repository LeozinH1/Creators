import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import User from '../models/Users'

interface Request {
    email: string
    password: string
}

interface Response {
    user: User
    token: string
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User)

        if (!email || !password) {
            throw new AppError('Missing fields.')
        }

        const user = await usersRepository.findOne({ where: { email } })

        if (!user) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        const hash = await bcrypt.hash(password, String(user.salt))

        if (hash !== user.password) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })

        return {
            user,
            token,
        }
    }
}

export default AuthenticateUserService
