import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Companies from '../entity/Companies'

class CompaniesController {
    async index (request: Request, response: Response): Promise<Companies[] | any> {
        try {
            const companies = await getRepository(Companies).find()
            console.log(`- [controllers-CompaniesController.index] --> Success --> ${companies.length} length`)
            return response.json(companies)
        } catch (error) {
            console.log(`- [controllers-CompaniesController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index CompaniesController' + error })
        }
    }

    async show (request: Request, response: Response): Promise<Companies | any> {
        const params = request.params
        try {
            const companie = await getRepository(Companies).find({ where: [{ ...params }] })
            console.log(`- [controllers-CompaniesController.show] --> Success --> ${companie.length} length`)
            return response.json(companie)
        } catch (error) {
            console.log(`- [controllers-CompaniesController.show] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error show CompaniesController' + error })
        }
    }

    async upsert (request: Request, response: Response): Promise<Companies | any> {
        try {
            const companies = request.body.resultQuerie
            const companiesUpdated = []

            for (const companie of companies) {
                const { code } = companie
                try {
                    const existCompanie = await getRepository(Companies).findOne({ code })
                    if (existCompanie) {
                        await getRepository(Companies).update({ code }, companie)
                        companiesUpdated.push(await getRepository(Companies).findOne({ code }))
                    } else {
                        companiesUpdated.push(await getRepository(Companies).save(companie))
                    }
                } catch (error) {
                    console.log(`- [controllers-CompaniesController.upsert] --> Error --> codi_emp = ${code} | ${error}`)
                }
            }
            console.log(`- [controllers-CompaniesController.upsert] --> Sucess --> ${companiesUpdated.length} length`)
            return response.json(companiesUpdated)
        } catch (error) {
            console.log(`- [controllers-CompaniesController.upsert] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save CompaniesController' + error })
        }
    }
}

export default CompaniesController