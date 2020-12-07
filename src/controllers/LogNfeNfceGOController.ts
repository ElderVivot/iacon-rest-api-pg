import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogNfeNfceGO from '../entity/LogNfeNfceGO'

class LogNfeNfceGOController {
    async index (request: Request, response: Response): Promise<LogNfeNfceGO[] | any> {
        try {
            const { cgceCompanie, modelNF, dateLogInicial, dateLogFinal } = request.query
            const logNfeNfceGO = await getRepository(LogNfeNfceGO).query(
                `SELECT *
                   FROM log_nfe_nfce_go AS logs
                  WHERE ( logs."cgceCompanie" = $1 OR $1 IS NULL )
                    AND ( logs."modelNF" = $2 OR $2 IS NULL )
                    AND ( ( DATE(logs."hourLog") BETWEEN DATE($3) AND DATE($4) ) OR ( $3 IS NULL OR $4 IS NULL ) )`,
                [cgceCompanie, modelNF, dateLogInicial, dateLogFinal]
            )
            console.log(`- [controllers-LogNfeNfceGOController.index] --> Success --> ${logNfeNfceGO.length} length`)
            return response.json(logNfeNfceGO)
        } catch (error) {
            console.log(`- [controllers-LogNfeNfceGOController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index LogNfeNfceGOController' + error })
        }
    }

    async store (request: Request, response: Response): Promise<LogNfeNfceGO | any> {
        try {
            const logNfeNfceGO = await getRepository(LogNfeNfceGO).save(request.body)
            console.log(`- [controllers-LogNfeNfceGOController.store] --> Sucess --> ${1} length`)
            return response.json(logNfeNfceGO)
        } catch (error) {
            console.log(request.body)
            console.log(`- [controllers-LogNfeNfceGOController.store] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save LogNfeNfceGOController' + error })
        }
    }

    async update (request: Request, response: Response): Promise<LogNfeNfceGO | any> {
        try {
            const { id } = request.params

            const existData = await getRepository(LogNfeNfceGO).findByIds([id])
            let logNfeNfceGO
            if (existData.length > 0) {
                const update = await getRepository(LogNfeNfceGO).update(id, request.body)
                if (update) {
                    logNfeNfceGO = await getRepository(LogNfeNfceGO).findOne(id)
                }
            }

            console.log(`- [controllers-LogNfeNfceGOController.update] --> Sucess --> ${1} length`)
            return response.json(logNfeNfceGO)
        } catch (error) {
            console.log(`- [controllers-LogNfeNfceGOController.update] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save LogNfeNfceGOController' + error })
        }
    }
}

export default LogNfeNfceGOController