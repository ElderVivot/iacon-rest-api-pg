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
            const companies = request.body
            const companiesUpdated = []

            for (const companie of companies) {
                const { code } = companie
                const existCompanie = await getRepository(Companies).findOne({ code })
                if (existCompanie) {
                    await getRepository(Companies).update({ code }, companie)
                    companiesUpdated.push(await getRepository(Companies).findOne({ code }))
                } else {
                    companiesUpdated.push(await getRepository(Companies).save(companie))
                }
            }
            return response.json(companiesUpdated)
        } catch (error) {
            return response.status(500).json({ message: 'Error save CompaniesController' + error })
        }
    }
}

export default CompaniesController