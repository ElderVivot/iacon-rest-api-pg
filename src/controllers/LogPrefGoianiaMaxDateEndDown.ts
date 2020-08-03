import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import LogPrefGoiania from '../entity/LogPrefGoiania'

class LogPrefGoianiaMaxDateEndDown {
    async show (request: Request, response: Response): Promise<LogPrefGoiania | any> {
        try {
            const { inscricaoMunicipal } = request.query
            const logPrefGoiania = await getRepository(LogPrefGoiania).query(
                `SELECT MAX(logs."dateEndDown") AS dateDownMax
                   FROM log_pref_goiania AS logs
                  WHERE logs."inscricaoMunicipal" = $1
                    AND logs."typeLog" = 'success'`,
                [inscricaoMunicipal]
            )
            console.log(`- [controllers-LogPrefGoianiaMaxDateEndDown.show] --> Success --> ${logPrefGoiania.length} length`)
            return response.json(logPrefGoiania[0])
        } catch (error) {
            console.log(`- [controllers-LogPrefGoianiaMaxDateEndDown.show] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error show LogPrefGoianiaMaxDateEndDown' + error })
        }
    }
}

export default LogPrefGoianiaMaxDateEndDown