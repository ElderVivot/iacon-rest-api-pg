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

    app.use(bodyParser.json({ limit: '100mb' }))
    app.use(routes)
    app.use(cors())

    // app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

    app.listen(3330, () => console.log('Executing ...'))
}).catch(
    error => console.log(error)
)