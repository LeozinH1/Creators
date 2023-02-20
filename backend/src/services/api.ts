import axios from 'axios'
import paypal from '../config/paypal'

const api = axios.create({
    baseURL: paypal.access.base_url,
    auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET_ID,
    },
})

export default api
