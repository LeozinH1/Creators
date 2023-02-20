import { AxiosResponse } from 'axios'
import AppError from '../errors/AppError'
import api from './api'

interface Request {
    new_price: number
    plan_id: string
}

class UpdatePriceService {
    public async execute({
        new_price,
        plan_id,
    }: Request): Promise<AxiosResponse> {
        if (new_price < 1 || new_price > 100) {
            throw new AppError('Choose a value between R$1,00 and R$100,00.')
        }

        const response = await api.post(
            `/billing/plans/${plan_id}/update-pricing-schemes`,
            {
                pricing_schemes: [
                    {
                        billing_cycle_sequence: 1,
                        pricing_scheme: {
                            fixed_price: {
                                value: new_price,
                                currency_code: 'BRL',
                            },
                            roll_out_strategy: {
                                process_change_from: 'NEXT_PAYMENT',
                            },
                        },
                    },
                ],
            },
        )

        return response
    }
}

export default UpdatePriceService
