import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import NotesNfse from '../entity/NotesNfse'

export default class NotesNfseController {
    async index (request: Request, response: Response): Promise<NotesNfse[] | any> {
        try {
            const { inscricaoMunicipal, dateNoteInicial, dateNoteFinal } = request.query
            const notesNfse = await getRepository(NotesNfse).query(
                `SELECT *
                   FROM notes_nfse AS nn
                  WHERE ( nn."inscricaoMunicipalCompanie" = $1 OR $1 IS NULL )
                    AND ( ( DATE(nn."dateNote") BETWEEN DATE($2) AND DATE($3) ) OR ( $2 IS NULL OR $3 IS NULL ) )`,
                [inscricaoMunicipal, dateNoteInicial, dateNoteFinal]
            )
            console.log(`- [controllers-NotesNfseController.index] --> Success --> ${notesNfse.length} length`)
            return response.json(notesNfse)
        } catch (error) {
            console.log(`- [controllers-NotesNfseController.index] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error index NotesNfseController' + error })
        }
    }

    async upsert (request: Request, response: Response): Promise<NotesNfse | any> {
        try {
            const note = request.body
            const { inscricaoMunicipalCompanie, codeCompanie, keyNote } = note
            let noteSaved

            const exist = await getRepository(NotesNfse).findOne({ inscricaoMunicipalCompanie, codeCompanie, keyNote })
            if (exist) {
                await getRepository(NotesNfse).update({ inscricaoMunicipalCompanie, codeCompanie, keyNote }, note)
                noteSaved = await getRepository(NotesNfse).findOne({ inscricaoMunicipalCompanie, codeCompanie, keyNote })
            } else {
                noteSaved = await getRepository(NotesNfse).save(note)
            }
            console.log(`- [controllers-NotesNfseController.upsert] --> Sucess --> ${1} length`)
            return response.json(noteSaved)
        } catch (error) {
            console.log(`- [controllers-NotesNfseController.upsert] --> Error --> ${error}`)
            return response.status(500).json({ message: 'Error save NotesNfseController' + error })
        }
    }
}