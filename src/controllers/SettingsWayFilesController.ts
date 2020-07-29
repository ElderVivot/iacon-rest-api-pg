import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import SettingsWayFiles from '../entity/SettingsWayFiles'

class SettingsWayFilesController {
    async index (request: Request, response: Response): Promise<SettingsWayFiles | any> {
        try {
            const settingsWayFiles = await getRepository(SettingsWayFiles).findOne()
            console.log(`- [controllers-SettingsWayFilesController.index] --> Success --> ${1} length`)
            return response.json(settingsWayFiles)
        } catch (error) {
            console.log(`- [controllers-SettingsWayFilesController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index SettingsWayFilesController' + error })
        }
    }

    async upsert (request: Request, response: Response): Promise<SettingsWayFiles | any> {
        try {
            const { id } = request.params
            const settingsWayFiles = request.body
            let setting

            const existSettings = await getRepository(SettingsWayFiles).findByIds([id])
            if (existSettings.length > 0) {
                const update = await getRepository(SettingsWayFiles).update(id, settingsWayFiles)
                if (update) {
                    setting = await getRepository(SettingsWayFiles).findByIds([id])
                }
            } else {
                setting = await getRepository(SettingsWayFiles).save(settingsWayFiles)
            }
            console.log(`- [controllers-SettingsWayFilesController.upsert] --> Sucess --> ${setting.length} length`)
            return response.json(setting)
        } catch (error) {
            console.log(`- [controllers-SettingsWayFilesController.upsert] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save SettingsWayFilesController' + error })
        }
    }
}

export default SettingsWayFilesController