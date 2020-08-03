import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import CompaniesGoiania from '../entity/CompaniesGoiania'

export default class CompaniesGoianiaQtdNotes {
    async index (request: Request, response: Response): Promise<CompaniesGoiania[] | any> {
        try {
            const { inscricaoMunicipal, dateNoteInicial, dateNoteFinal } = request.query
            const notesNfse = await getRepository(CompaniesGoiania).query(
                `SELECT cg."id", cg."inscricaoMunicipal", cg."name", cg."cgce", cg."code", COUNT(*) AS qtd_notes,
                        SUM(nn."amountNote") AS amountServicos
                   FROM companies_goiania AS cg
                        INNER JOIN notes_nfse AS nn
                             ON    nn."inscricaoMunicipalCompanie" = cg."inscricaoMunicipal"
                  WHERE ( cg."inscricaoMunicipal" = $1 OR $1 IS NULL )
                    AND ( ( DATE(nn."dateNote") BETWEEN DATE($2) AND DATE($3) ) OR ( $2 IS NULL OR $3 IS NULL ) )
                GROUP BY cg."id", cg."inscricaoMunicipal", cg."name", cg."cgce", cg."code"`,
                [inscricaoMunicipal, dateNoteInicial, dateNoteFinal]
            )
            console.log(`- [controllers-CompaniesGoianiaQtdNotes.index] --> Success --> ${notesNfse.length} length`)
            return response.json(notesNfse)
        } catch (error) {
            console.log(`- [controllers-CompaniesGoianiaQtdNotes.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index CompaniesGoianiaQtdNotes' + error })
        }
    }
}