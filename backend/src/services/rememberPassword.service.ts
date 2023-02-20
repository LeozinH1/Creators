import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import AppError from '../errors/AppError'
import User from '../models/Users'
import sendMail from '../nodeMailer/sendMail'
import authConfig from '../config/auth'

interface Request {
    user_email: string
}

class RememberPasswordService {
    public async execute({ user_email }: Request): Promise<void> {
        const usersRepository = getRepository(User)

        if (!user_email) {
            throw new AppError('Missing user email.')
        }

        const recoverUser = await usersRepository.findOne({
            where: { email: user_email },
        })

        if (!recoverUser) throw new AppError('Usuário não encontrado.')

        const { secret, expiresIn } = authConfig.recoverToken

        const recoverToken = sign({}, secret, {
            subject: recoverUser.id,
            expiresIn,
        })

        recoverUser.recoverToken = recoverToken

        await usersRepository.save(recoverUser)

        sendMail(
            'rememberPassword',
            {
                name: recoverUser?.name,
                recoverToken,
            },
            user_email,
            'Redefinir senha',
            '',
        )
    }
}

export default RememberPasswordService
