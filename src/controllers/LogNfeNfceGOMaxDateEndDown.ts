import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogNfeNfceGO from '../entity/LogNfeNfceGO'

class LogNfeNfceGOMaxDateEndDown {
    async show (request: Request, response: Response): Promise<LogNfeNfceGO | any> {
        try {
            const { cgceCompanie, modelNF } = request.query
            const logNfeNfceGO = await getRepository(LogNfeNfceGO).query(
                `SELECT MAX(logs."dateEndDown") AS dateDownMax
                   FROM log_nfe_nfce_go AS logs
                  WHERE logs."cgceCompanie" = '${cgceCompanie}'
                    AND logs."modelNF" = '${modelNF}'
                    AND ( logs."typeLog" IN ('success', 'processing')
                        OR ( logs."typeLog" IN ('warning') 
                           AND logs."messageError" IN ('NOT_EXIST_NOTES_TO_DOWN', 'NOT_EXIST_NOTES') ) )`
            )
            console.log(`- [controllers-LogNfeNfceGOMaxDateEndDown.show] --> Success --> ${logNfeNfceGO.length} length`)
            return response.json(logNfeNfceGO[0])
        } catch (error) {
            console.log(`- [controllers-LogNfeNfceGOMaxDateEndDown.show] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error show LogNfeNfceGOMaxDateEndDown' + error })
        }
    }
}

export default LogNfeNfceGOMaxDateEndDown