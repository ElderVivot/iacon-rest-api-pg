import path from 'path'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import 'dotenv/config'

const typeOrmConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [path.resolve(__dirname, '../entity/**/*.ts')],
    migrations: [path.resolve(__dirname, '../migrations/**/*.ts')],
    subscribers: [path.resolve(__dirname, '../subscriber/**/*.ts')],
    cli: {
        entitiesDir: path.resolve(__dirname, '../entity'),
        migrationsDir: path.resolve(__dirname, '../migrations'),
        subscribersDir: path.resolve(__dirname, '../subscriber')
    }
}

export default typeOrmConfig