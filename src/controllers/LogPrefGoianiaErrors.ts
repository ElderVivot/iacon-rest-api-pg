import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogPrefGoiania from '../entity/LogPrefGoiania'

class LogPrefGoianiaErrors {
    async index (request: Request, response: Response): Promise<LogPrefGoiania[] | any> {
        try {
            const logPrefGoiania = await getRepository(LogPrefGoiania).query(
                `SELECT logs."id", logs."inscricaoMunicipal", logs."dateStartDown", logs."dateEndDown",
                        logs."qtdTimesReprocessed", access."user", access."password", access."id" AS idUser
                   FROM log_pref_goiania AS logs
                        INNER JOIN pref_goiania_access AS access
                             ON    access."id" = logs."prefGoianiaAccessId"
                  WHERE logs."typeLog" = 'error'
                    AND logs."qtdTimesReprocessed" <= 7`,
                []
            )
            console.log(`- [controllers-LogPrefGoianiaErrors.index] --> Success --> ${logPrefGoiania.length} length`)
            return response.json(logPrefGoiania)
        } catch (error) {
            console.log(`- [controllers-LogPrefGoianiaErrors.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index LogPrefGoianiaErrors' + error })
        }
    }
}

export default LogPrefGoianiaErrors