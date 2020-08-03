import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogPrefGoiania from '../entity/LogPrefGoiania'

class LogPrefGoianiaController {
    async index (request: Request, response: Response): Promise<LogPrefGoiania[] | any> {
        try {
            const { inscricaoMunicipal, dateLogInicial, dateLogFinal } = request.query
            const logPrefGoiania = await getRepository(LogPrefGoiania).query(
                `SELECT *
                   FROM log_pref_goiania AS logs
                  WHERE ( logs."inscricaoMunicipal" = $1 OR $1 IS NULL )
                    AND ( ( DATE(logs."hourLog") BETWEEN DATE($2) AND DATE($3) ) OR ( $2 IS NULL OR $3 IS NULL ) )`,
                [inscricaoMunicipal, dateLogInicial, dateLogFinal]
            )
            console.log(`- [controllers-LogPrefGoianiaController.index] --> Success --> ${logPrefGoiania.length} length`)
            return response.json(logPrefGoiania)
        } catch (error) {
            console.log(`- [controllers-LogPrefGoianiaController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index LogPrefGoianiaController' + error })
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

    async update (request: Request, response: Response): Promise<LogPrefGoiania | any> {
        try {
            const { id } = request.params

            const existData = await getRepository(LogPrefGoiania).findByIds([id])
            let logPrefGoiania
            if (existData.length > 0) {
                const update = await getRepository(LogPrefGoiania).update(id, request.body)
                if (update) {
                    logPrefGoiania = await getRepository(LogPrefGoiania).findOne(id)
                }
            }

            console.log(`- [controllers-LogPrefGoianiaController.update] --> Sucess --> ${1} length`)
            return response.json(logPrefGoiania)
        } catch (error) {
            console.log(`- [controllers-LogPrefGoianiaController.update] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save LogPrefGoianiaController' + error })
        }
    }
}

export default LogPrefGoianiaController