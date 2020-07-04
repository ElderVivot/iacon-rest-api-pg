import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Companies from '../entity/Companies'

class CompaniesController {
    async index (request: Request, response: Response): Promise<Companies[] | any> {
        try {
            const companies = await getRepository(Companies).find()
            return response.json(companies)
        } catch (error) {
            return response.status(500).json({ message: 'Error index CompaniesController' + error })
        }
    }

    async upsert (request: Request, response: Response): Promise<Companies | any> {
        try {
            let companies
            const { code } = request.body
            const existCompanie = await getRepository(Companies).findOne({ code })
            if (existCompanie) {
                companies = await getRepository(Companies).update({ code }, request.body)

                const companiesUpdate = await getRepository(Companies).findOne({ code })
                return response.json(companiesUpdate)
            } else {
                companies = await getRepository(Companies).save(request.body)
            }
            return response.json(companies)
        } catch (error) {
            return response.status(500).json({ message: 'Error save CompaniesController' + error })
        }
    }
}

export default CompaniesController