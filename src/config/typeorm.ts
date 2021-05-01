import path from 'path'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import 'dotenv/config'

let typeFile = 'ts'
if (process.env.PRODUCTION === 'true') {
    typeFile = 'js'
}

const typeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [path.resolve(__dirname, '../entity/**', `*.${typeFile}`)],
    migrations: [path.resolve(__dirname, '../migrations/**', `*.${typeFile}`)],
    subscribers: [path.resolve(__dirname, '../subscriber/**', `*.${typeFile}`)],
    // entities: [path.resolve(__dirname, '../entity/**/*.ts')],
    // migrations: [path.resolve(__dirname, '../migrations/**/*.ts')],
    // subscribers: [path.resolve(__dirname, '../subscriber/**/*.ts')],
    cli: {
        entitiesDir: path.resolve(__dirname, '../entity'),
        migrationsDir: path.resolve(__dirname, '../migrations'),
        subscribersDir: path.resolve(__dirname, '../subscriber')
    }
}

export default typeOrmConfig