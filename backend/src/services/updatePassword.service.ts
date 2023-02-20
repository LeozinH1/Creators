import { hash } from 'bcryptjs'
import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import User from '../models/Users'
import sendMail from '../nodeMailer/sendMail'

interface Request {
    user_id: string
    old_pass?: string
    new_pass: string
    conf_pass: string
    recoverPass: boolean
}

class UpdatePasswordService {
    public async execute({
        user_id,
        old_pass,
        new_pass,
        conf_pass,
        recoverPass,
    }: Request): Promise<User> {
        const userRepository = getRepository(User)

        if (!user_id) throw new AppError('Empty user_id')
        if (!new_pass) throw new AppError('Empty new password')
        if (!conf_pass) throw new AppError('Empty new password confirmation')
        if (new_pass !== conf_pass) throw new AppError('Passwords no match')

        const user = await userRepository.findOne(user_id)

        if (!user) throw new AppError('User not found!')

        if (!recoverPass) {
            if (!old_pass) throw new AppError('Empty old password')

            if (new_pass === old_pass)
                throw new AppError('Nova senha é igual a senha atual.')

            const oldPassword = await hash(old_pass, String(user.salt))

            if (oldPassword !== user.password)
                throw new AppError('Old pass no match')
        }

        const hashedPassword = await hash(new_pass, String(user.salt))
        user.password = hashedPassword
        await userRepository.save(user)

        /* ----------------------------------- SEND EMAIL -----------------------------------*/

        sendMail(
            'passwordChanged',
            {
                name: user.name,
            },
            user.email,
            'Sua senha foi alterada!',
            '',
        )

        /* ----------------------------------------------------------------------------------*/

        // Remove sensitive data
        delete user.password
        delete user.salt
        delete user.confirmationToken
        delete user.recoverToken

        return user
    }
}

export default UpdatePasswordService
