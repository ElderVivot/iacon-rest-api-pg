import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogNfeNfceGO from '../entity/LogNfeNfceGO'

class LogNfeNfceGOErrors {
    async index (request: Request, response: Response): Promise<LogNfeNfceGO[] | any> {
        try {
            const logNfeNfceGO = await getRepository(LogNfeNfceGO).query(
                `SELECT logs."id", logs."cgceCompanie", logs."modelNF", logs."situacaoNF", logs."dateStartDown", logs."dateEndDown",
                        logs."qtdTimesReprocessed", logs."wayCertificate"
                   FROM log_nfe_nfce_go AS logs
                  WHERE logs."typeLog" = 'error'
                    AND logs."qtdTimesReprocessed" <= 7`,
                []
            )
            console.log(`- [controllers-LogNfeNfceGOErrors.index] --> Success --> ${logNfeNfceGO.length} length`)
            return response.json(logNfeNfceGO)
        } catch (error) {
            console.log(`- [controllers-LogNfeNfceGOErrors.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index LogNfeNfceGOErrors' + error })
        }
    }
}

export default LogNfeNfceGOErrors