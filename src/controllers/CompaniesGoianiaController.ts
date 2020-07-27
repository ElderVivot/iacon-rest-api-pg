import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import CompaniesGoiania from '../entity/CompaniesGoiania'

export default class CompaniesGoianiaController {
    async index (request: Request, response: Response): Promise<CompaniesGoiania[] | any> {
        try {
            const companiesGoiania = await getRepository(CompaniesGoiania).find()
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
            console.log(companieGoiania)
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
}