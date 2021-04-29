import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogNfeNfceGO from '../entity/LogNfeNfceGO'

class LogNfeNfceGOFetchCompetence {
    async show (request: Request, response: Response): Promise<LogNfeNfceGO | any> {
        try {
            const { cgceCompanie, modelNF, month, year } = request.query
            const logNfeNfceGO = await getRepository(LogNfeNfceGO).query(
                `SELECT logs."cgceCompanie", logs."modelNF", MIN(logs."dateStartDown"), MAX(logs."dateEndDown")
                   FROM log_nfe_nfce_go AS logs
                  WHERE logs."cgceCompanie" = '${cgceCompanie}'
                    AND logs."modelNF" = '${modelNF}'
                    AND EXTRACT(MONTH FROM logs."dateStartDown") = ${month}
                    AND EXTRACT(YEAR FROM logs."dateStartDown") = ${year}
               GROUP BY logs."cgceCompanie", logs."modelNF"`
            )
            console.log(`- [controllers-LogNfeNfceGOFetchCompetence.show] --> Success --> ${logNfeNfceGO.length} length`)
            return response.json(logNfeNfceGO[0])
        } catch (error) {
            console.log(`- [controllers-LogNfeNfceGOFetchCompetence.show] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error show LogNfeNfceGOFetchCompetence' + error })
        }
    }
}

export default LogNfeNfceGOFetchCompetence