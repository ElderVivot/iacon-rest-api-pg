import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

import typeOrmConfig from './config/typeorm'
import routes from './routes'
// import path from 'path'

// create typeorm connection
createConnection(typeOrmConfig).then(_ => {
    const app = express()

    app.use(cors())
    app.use(bodyParser.json({ limit: '100mb' }))
    app.use(routes)

    // app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

    const port = 3330
    app.listen(port, () => console.log(`Executing Server API - TypeORM with REST in port ${port} !`))
}).catch(
    error => console.log(error)
)