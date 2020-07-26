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

    app.use(cors({ origin: '*' }))
    app.use(bodyParser.json({ limit: '100mb' }))
    app.use(bodyParser.urlencoded({ extended: false }))
<<<<<<< HEAD
    app.use(routes)
=======
    app.use(routes)    
>>>>>>> e84392a210512fecaa0817c360db36839dfe1d64

    // app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

    const port = 3330
    app.listen(port, () => console.log(`Executing Server API - TypeORM with REST in port ${port} !`))
}).catch(
    error => console.log(error)
)