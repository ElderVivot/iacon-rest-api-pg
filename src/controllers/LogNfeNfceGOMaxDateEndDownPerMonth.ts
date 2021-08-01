import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogNfeNfceGO from '../entity/LogNfeNfceGO'

class LogNfeNfceGOMaxDateEndDownPerMonth {
    async show (request: Request, response: Response): Promise<LogNfeNfceGO | any> {
        try {
            const { cgceCompanie, modelNF, month, year, situacaoNF } = request.query
            const logNfeNfceGO = await getRepository(LogNfeNfceGO).query(
                `SELECT MAX(logs."dateEndDown") AS dateDownMax
                   FROM log_nfe_nfce_go AS logs
                  WHERE logs."cgceCompanie" = '${cgceCompanie}'
                    AND logs."modelNF" = '${modelNF}'
                    AND logs."situacaoNF" = '${situacaoNF}'
                    AND ( logs."typeLog" IN ('success')
                        OR ( logs."typeLog" IN ('warning') 
                           AND logs."messageError" IN ('NOT_EXIST_NOTES_TO_DOWN', 'NOT_EXIST_NOTES') ) )
                    AND EXTRACT(MONTH FROM logs."dateStartDown") = ${month}
                    AND EXTRACT(YEAR FROM logs."dateStartDown") = ${year}`
            )
            console.log(`- [controllers-LogNfeNfceGOMaxDateEndDownPerMonth.show] --> Success --> ${logNfeNfceGO.length} length`)
            return response.json(logNfeNfceGO[0])
        } catch (error) {
            console.log(`- [controllers-LogNfeNfceGOMaxDateEndDownPerMonth.show] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error show LogNfeNfceGOMaxDateEndDownPerMonth' + error })
        }
    }
}

export default LogNfeNfceGOMaxDateEndDownPerMonth