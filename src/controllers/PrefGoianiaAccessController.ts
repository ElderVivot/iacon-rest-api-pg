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
                    const exist = await getRepository(PrefGoianiaAccess).findOne({ user })
                    if (exist) {
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

    async upsert (request: Request, response: Response): Promise<PrefGoianiaAccess | any> {
        try {
            // console.log(request.body)
            const accessOriginal = request.body
            const { user, name, password, active } = accessOriginal
            let goianiaAcess

            const newActive = String(active) === 'true'
            const access = {
                user, name, password, active: newActive
            }

            const exist = await getRepository(PrefGoianiaAccess).findOne({ user })
            if (exist) {
                await getRepository(PrefGoianiaAccess).update({ user }, access)
                goianiaAcess = await getRepository(PrefGoianiaAccess).findOne({ user })
            } else {
                goianiaAcess = await getRepository(PrefGoianiaAccess).save(access)
            }
            console.log(`- [controllers-PrefGoianiaAccessController.upsert] --> Sucess --> ${1} length`)
            return response.json(goianiaAcess)
        } catch (error) {
            console.log(`- [controllers-PrefGoianiaAccessController.upsert] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save PrefGoianiaAccessController' + error })
        }
    }
}

export default PrefGoianiaAccessController