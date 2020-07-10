import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogPrefGoiania from '../entity/LogPrefGoiania'

class LogPrefGoianiaController {
    async index (request: Request, response: Response): Promise<LogPrefGoiania[] | any> {
        try {
            const logPrefGoiania = await getRepository(LogPrefGoiania).find()
            console.log(`- [controllers-LogPrefGoianiaController.index] --> Success --> ${logPrefGoiania.length} length`)
            return response.json(logPrefGoiania)
        } catch (error) {
            console.log(`- [controllers-LogPrefGoianiaController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index LogPrefGoianiaController' + error })
        }
    }

    async showMaxDateEndDown (request: Request, response: Response): Promise<LogPrefGoiania | any> {
        try {
            const { inscricaoMunicipal } = request.query
            const logPrefGoiania = await getRepository(LogPrefGoiania).query(
                `SELECT MAX(logs."dateEndDown") AS dateDownMax
                   FROM log_pref_goiania AS logs
                  WHERE logs."inscricaoMunicipal" = $1
                    AND logs."typeLog" = 'success'`,
                [inscricaoMunicipal]
            )
            console.log(`- [controllers-LogPrefGoianiaController.showMaxDateEndDown] --> Success --> ${logPrefGoiania.length} length`)
            return response.json(logPrefGoiania[0])
        } catch (error) {
            console.log(`- [controllers-LogPrefGoianiaController.showMaxDateEndDown] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error showMaxDateEndDown LogPrefGoianiaController' + error })
        }
    }

    async store (request: Request, response: Response): Promise<LogPrefGoiania | any> {
        try {
            const logPrefGoiania = await getRepository(LogPrefGoiania).save(request.body)
            console.log(`- [controllers-LogPrefGoianiaController.store] --> Sucess --> ${1} length`)
            return response.json(logPrefGoiania)
        } catch (error) {
            console.log(`- [controllers-LogPrefGoianiaController.store] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save LogPrefGoianiaController' + error })
        }
    }
}

export default LogPrefGoianiaController