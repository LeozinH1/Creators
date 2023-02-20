import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'
import Payouts from '../models/Payouts'
import Payments from '../models/Payments'

interface Request {
    creator_id: string
    pix: string
}

class PayoutRequestService {
    public async execute({ creator_id, pix }: Request): Promise<Payouts> {
        const paymentsRepository = getRepository(Payments)

        const payments = await paymentsRepository.find({
            creator_id,
            paid: false,
        })

        const paymentTotal = payments.reduce((acc, curr) => {
            return acc + curr.total
        }, 0)

        if (paymentTotal < 100) {
            throw new AppError(
                'Você precisa ter no mínimo R$100,00 para poder solicitar o saque.',
            )
        }

        const payoutsRepository = getRepository(Payouts)

        const request = await payoutsRepository.findOne({
            creator_id,
            status: 'PENDING',
        })

        if (request) {
            throw new AppError('Você possuí uma solicitação de saque pendente.')
        }

        const payoutSave = await payoutsRepository.save({
            creator_id,
            status: 'PENDING',
            pix,
        })

        return payoutSave
    }
}

export default PayoutRequestService
