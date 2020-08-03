import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogPrefGoiania from '../entity/LogPrefGoiania'

class LogPrefGoianiaErrors {
    async index (request: Request, response: Response): Promise<LogPrefGoiania[] | any> {
        try {
            const logPrefGoiania = await getRepository(LogPrefGoiania).find({ typeLog: 'error' })
            console.log(`- [controllers-LogPrefGoianiaErrors.index] --> Success --> ${logPrefGoiania.length} length`)
            return response.json(logPrefGoiania)
        } catch (error) {
            console.log(`- [controllers-LogPrefGoianiaErrors.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index LogPrefGoianiaErrors' + error })
        }
    }
}

export default LogPrefGoianiaErrors