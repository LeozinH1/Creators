import { Router } from 'express'
import path from 'path'
import usersRouter from './users.route'
import sessionsRouter from './sessions.route'
import paypalRouter from './paypal.route'
import creatorsRouter from './creators.route'
import subscribeRoute from './subscribe.route'
import postsRoute from './posts.route'
import AppError from '../errors/AppError'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/creators', creatorsRouter)
routes.use('/subscribe', subscribeRoute)
routes.use('/posts', postsRoute)
routes.use('/paypal/v1', paypalRouter)

// Get Image
routes.get('/image/:file_name', async (request, response) => {
    const image_name = request.params.file_name
    try {
        const imagePath = path.resolve(__dirname, '..', 'tmp', image_name)
        return response.sendFile(imagePath)
    } catch {
        throw new AppError('Não foi possivel localizar a imagem.')
    }
})

export default routes
