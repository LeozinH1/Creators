import { Router } from 'express'
import { getRepository } from 'typeorm'
import CreatePaymentService from '../services/createPayment.service'
import ActiveSubscriptionService from '../services/activeSubscription.service'
import Subscriptions from '../models/Subscriptions'
import AppError from '../errors/AppError'
import ensurePaypalReq from '../middlewares/ensurePaypalReq'

const paypalRoute = Router()

paypalRoute.post('/webhooks', async (request, response) => {
    const data = request.body
    console.log(data.event_type)

    const subscriptionsRepository = getRepository(Subscriptions)
    const subscription = await subscriptionsRepository.findOne(data.resource.id)
    if (!subscription) throw new AppError('Subscription not found')

    switch (request.body.event_type) {
        case 'BILLING.SUBSCRIPTION.ACTIVATED': {
            const activeSubscription = new ActiveSubscriptionService()
            await activeSubscription.execute({
                id: data.resource.id,
                status: data.resource.status,
                next_billing: data.resource.billing_info.next_billing_time,
                payer_id: data.resource.subscriber.payer_id,
            })

            break
        }

        case 'PAYMENT.SALE.COMPLETED': {
            const createPayment = new CreatePaymentService()
            await createPayment.execute({
                payment_id: data.resource.id,
                total: data.resource.amount.total,
                transaction_fee: data.resource.transaction_fee.value,
                currency: data.resource.amount.currency,
                subscription_id: data.resource.billing_agreement_id,
            })

            break
        }

        case 'BILLING.SUBSCRIPTION.RE-ACTIVATED': {
            // SUBSCRIPTION STATUS = ACTIVE

            await subscriptionsRepository.update(subscription, {
                status: 'ACTIVE',
                next_billing: data.resource.next_billing_date,
            })

            break
        }

        case 'BILLING.SUBSCRIPTION.CANCELLED': {
            // SUBSCRIPTION STATUS = CANCELLED

            await subscriptionsRepository.update(subscription, {
                status: 'CANCELLED',
            })

            break
        }

        case 'BILLING.SUBSCRIPTION.EXPIRED': {
            // SUBSCRIPTION STATUS = EXPIRED

            await subscriptionsRepository.update(subscription, {
                status: 'EXPIRED',
            })

            break
        }

        case 'BILLING.SUBSCRIPTION.SUSPENDED': {
            // SUBSCRIPTION STATUS = SUSPENDED

            await subscriptionsRepository.update(subscription, {
                status: 'SUSPENDED',
            })

            break
        }

        default:
            console.log(request.body)
            break
    }

    return response.status(200).json({})
})

export default paypalRoute
