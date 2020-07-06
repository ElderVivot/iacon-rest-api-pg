import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import SettingsDownNotes from '../entity/SettingsDownNotes'

class SettingsDownNotesController {
    async index (request: Request, response: Response): Promise<SettingsDownNotes | any> {
        try {
            const settingsDownNotes = await getRepository(SettingsDownNotes).findOne()
            console.log(`- [controllers-SettingsDownNotesController.index] --> Success --> ${SettingsDownNotes.length} length`)
            return response.json(settingsDownNotes)
        } catch (error) {
            console.log(`- [controllers-SettingsDownNotesController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index SettingsDownNotesController' + error })
        }
    }

    async upsert (request: Request, response: Response): Promise<SettingsDownNotes | any> {
        try {
            const { id } = request.params
            const settingsDownNotes = request.body
            let setting

            const existSettings = await getRepository(SettingsDownNotes).findByIds([id])
            if (existSettings.length > 0) {
                const update = await getRepository(SettingsDownNotes).update(id, settingsDownNotes)
                if (update) {
                    setting = await getRepository(SettingsDownNotes).findByIds([id])
                }
            } else {
                setting = await getRepository(SettingsDownNotes).save(settingsDownNotes)
            }
            console.log(`- [controllers-SettingsDownNotesController.upsert] --> Sucess --> ${setting.length} length`)
            return response.json(setting)
        } catch (error) {
            console.log(`- [controllers-SettingsDownNotesController.upsert] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save SettingsDownNotesController' + error })
        }
    }
}

export default SettingsDownNotesController