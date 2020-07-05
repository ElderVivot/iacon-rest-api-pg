import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import PrefGoianiaAccess from '../entity/PrefGoianiaAccess'

class PrefGoianiaAccessController {
    async index (request: Request, response: Response): Promise<PrefGoianiaAccess[] | any> {
        try {
            const prefGoianiaAccess = await getRepository(PrefGoianiaAccess).find()
            console.log(`- [controllers-PrefGoianiaAccessController.index] --> Success --> ${prefGoianiaAccess.length} length`)
            return response.json(prefGoianiaAccess)
        } catch (error) {
            console.log(`- [controllers-PrefGoianiaAccessController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index PrefGoianiaAccessController' + error })
        }
    }

    async upsertMany (request: Request, response: Response): Promise<PrefGoianiaAccess | any> {
        try {
            const prefGoianiaAccess = request.body
            const prefGoianiaAccessUpdated = []

            for (const access of prefGoianiaAccess) {
                const { user } = access
                try {
                    const existCompanie = await getRepository(PrefGoianiaAccess).findOne({ user })
                    if (existCompanie) {
                        await getRepository(PrefGoianiaAccess).update({ user }, access)
                        prefGoianiaAccessUpdated.push(await getRepository(PrefGoianiaAccess).findOne({ user }))
                    } else {
                        prefGoianiaAccessUpdated.push(await getRepository(PrefGoianiaAccess).save(access))
                    }
                } catch (error) {
                    console.log(`- [controllers-PrefGoianiaAccessController.upsertMany] --> Error --> user = ${user} | ${error}`)
                }
            }
            console.log(`- [controllers-PrefGoianiaAccessController.upsertMany] --> Sucess --> ${prefGoianiaAccessUpdated.length} length`)
            return response.json(prefGoianiaAccessUpdated)
        } catch (error) {
            console.log(`- [controllers-PrefGoianiaAccessController.upsertMany] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save PrefGoianiaAccessController' + error })
        }
    }
}

export default PrefGoianiaAccessController