import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'
import api from '../services/api'
import paypalcfg from '../config/paypal'

export default function ensurePaypalReq(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    api.post('/notifications/verify-webhook-signature', {
        auth_algo: request.get('paypal-auth-algo'),
        cert_url: request.get('paypal-cert-url'),
        transmission_id: request.get('paypal-transmission-id'),
        transmission_sig: request.get('paypal-transmission-sig'),
        transmission_time: request.get('paypal-transmission-time'),
        webhook_id: paypalcfg.config.webhook_id,
        webhook_event: request.body,
    }).then(res => {
        if (res.data.verification_status === 'SUCCESS') {
            return next()
        }
        throw new AppError('Paypal webhook validation fail.')
    })
    throw new AppError('Paypal webhook validation fail.')
}
