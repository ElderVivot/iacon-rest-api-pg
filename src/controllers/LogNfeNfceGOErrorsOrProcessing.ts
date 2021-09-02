import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogNfeNfceGO from '../entity/LogNfeNfceGO'

export default class LogNfeNfceGOErrorsOrProcessing {
    async index (request: Request, response: Response): Promise<LogNfeNfceGO[] | any> {
        try {
            const { typeLog } = request.query
            let filterPerTypeLog = ''
            if (typeLog === 'error') filterPerTypeLog = 'AND logs."qtdTimesReprocessed" <= 7' // reprocess max 7 times
            else if (typeLog === 'warning') {
                // reprocess what is in processing only after 30 minutes last log
                filterPerTypeLog = `
                    AND ( DATE_PART('day', now()::timestamp - logs."updatedAt"::timestamp) * 24 
                          + DATE_PART('hour', now()::timestamp - logs."updatedAt"::timestamp) ) * 60 
                          + DATE_PART('minute', now()::timestamp - logs."updatedAt"::timestamp ) > 30
                `
            }

            const logNfeNfceGO = await getRepository(LogNfeNfceGO).query(
                `SELECT logs."id", logs."cgceCompanie", logs."modelNF", logs."situacaoNF", logs."dateStartDown", logs."dateEndDown",
                        logs."qtdTimesReprocessed", logs."wayCertificate", logs."pageInicial", logs."pageFinal"
                   FROM log_nfe_nfce_go AS logs
                  WHERE logs."typeLog" = '${typeLog}'
                    ${filterPerTypeLog}`,
                []
            )
            console.log(`- [controllers-LogNfeNfceGOErrorsOrProcessing.index] --> Success --> ${logNfeNfceGO.length} length`)
            return response.json(logNfeNfceGO)
        } catch (error) {
            console.log(`- [controllers-LogNfeNfceGOErrorsOrProcessing.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index LogNfeNfceGOErrorsOrProcessing' + error })
        }
    }
}