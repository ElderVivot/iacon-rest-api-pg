import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogPrefGoiania from '../entity/LogPrefGoiania'

class LogPrefGoianiaController {
    async index (request: Request, response: Response): Promise<LogPrefGoiania[] | any> {
        try {
            const logPrefGoiania = await getRepository(LogPrefGoiania).find()
            console.log(`- [controllers-PrefGoianiaAccessController.index] --> Success --> ${logPrefGoiania.length} length`)
            return response.json(logPrefGoiania)
        } catch (error) {
            console.log(`- [controllers-PrefGoianiaAccessController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index PrefGoianiaAccessController' + error })
        }
    }

    async store (request: Request, response: Response): Promise<LogPrefGoiania | any> {
        try {
            const logPrefGoiania = await getRepository(LogPrefGoiania).save(request.body)
            console.log(`- [controllers-PrefGoianiaAccessController.upsertMany] --> Sucess --> ${1} length`)
            return response.json(logPrefGoiania)
        } catch (error) {
            console.log(`- [controllers-PrefGoianiaAccessController.upsertMany] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save PrefGoianiaAccessController' + error })
        }
    }
}

export default LogPrefGoianiaController