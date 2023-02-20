import cors from 'cors'
import http from 'http'
import https from 'https'
import fs from 'fs'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './routes'
import uploadConfig from './config/upload'
import AppError from './errors/AppError'
import './database'

const app = express()

app.use(express.json())

app.use(cors())

app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response
            .status(err.statusCode)
            .json({ status: 'error', message: err.message })
    }

    console.error(err)

    return response
        .status(500)
        .json({ status: 'error', message: 'Internal server error' })
})

const port = 3333
//
// HTTP SERVER
//
const httpServer = http.createServer(app)
httpServer.listen(port, () => {
    console.log(`🚀 HTTP Server running on port ${port}`)
})

// HTTPS SERVER

// const httpsServer = https.createServer(
//     {
//         key: fs.readFileSync(
//             '/etc/letsencrypt/live/creatorsapi.leozin.dev/privkey.pem',
//         ),
//         cert: fs.readFileSync(
//             '/etc/letsencrypt/live/creatorsapi.leozin.dev/fullchain.pem',
//         ),
//     },
//     app,
// )
// httpsServer.listen(port, () => {
//     console.log(`🚀 HTTPS Server running on port ${port}`)
// })
