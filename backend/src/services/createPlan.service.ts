import api from './api'
import AppError from '../errors/AppError'
import paypal from '../config/paypal'

interface Request {
    creator_name: string
    price: number
}

interface Plan {
    plan_id: string
    name: string
    status: string
    description: string
}

class CreatePlanService {
    public async execute({ creator_name, price }: Request): Promise<Plan> {
        const response = await api.post('/billing/plans', {
            product_id: paypal.config.prod_id,
            name: 'Monthly plan',
            description: `Monthly subscription of creator ${creator_name}.`,
            status: 'ACTIVE',
            billing_cycles: [
                {
                    frequency: {
                        interval_unit: 'MONTH',
                        interval_count: 1,
                    },
                    tenure_type: 'REGULAR',
                    sequence: 1,
                    total_cycles: 0,
                    pricing_scheme: {
                        fixed_price: {
                            value: price,
                            currency_code: 'BRL',
                        },
                    },
                },
            ],
            payment_preferences: {
                auto_bill_outstanding: true,
                setup_fee: {
                    value: '0',
                    currency_code: 'BRL',
                },
                setup_fee_failure_action: 'CONTINUE',
                payment_failure_threshold: 1,
            },
            taxes: {
                percentage: '0',
                inclusive: false,
            },
        })

        const creator = {
            plan_id: response.data.id,
            name: response.data.name,
            status: response.data.status,
            description: response.data.description,
        }

        return creator
    }
}

export default CreatePlanService
