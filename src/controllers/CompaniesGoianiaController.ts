import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import CompaniesGoiania from '../entity/CompaniesGoiania'

export default class CompaniesGoianiaController {
    async index (request: Request, response: Response): Promise<CompaniesGoiania[] | any> {
        try {
            const companiesGoiania = await getRepository(CompaniesGoiania).find({ ...request.query })
            console.log(`- [controllers-CompaniesGoianiaController.index] --> Success --> ${companiesGoiania.length} length`)
            return response.json(companiesGoiania)
        } catch (error) {
            console.log(`- [controllers-CompaniesGoianiaController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index CompaniesGoianiaController' + error })
        }
    }

    async upsert (request: Request, response: Response): Promise<CompaniesGoiania | any> {
        try {
            const companieGoiania = request.body
            const { inscricaoMunicipal } = companieGoiania
            let companieSaved

            const exist = await getRepository(CompaniesGoiania).findOne({ inscricaoMunicipal })
            if (exist) {
                await getRepository(CompaniesGoiania).update({ inscricaoMunicipal }, companieGoiania)
                companieSaved = await getRepository(CompaniesGoiania).findOne({ inscricaoMunicipal })
            } else {
                companieSaved = await getRepository(CompaniesGoiania).save(companieGoiania)
            }
            console.log(`- [controllers-CompaniesGoianiaController.upsert] --> Sucess --> ${1} length`)
            return response.json(companieSaved)
        } catch (error) {
            console.log(`- [controllers-CompaniesGoianiaController.upsert] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save CompaniesGoianiaController' + error })
        }
    }

    async qtdNotes (request: Request, response: Response): Promise<CompaniesGoiania[] | any> {
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
            console.log(`- [controllers-NotesNfseController.index] --> Success --> ${notesNfse.length} length`)
            return response.json(notesNfse)
        } catch (error) {
            console.log(`- [controllers-NotesNfseController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index NotesNfseController' + error })
        }
    }
}