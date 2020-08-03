import express from 'express'

import CompaniesController from './controllers/CompaniesController'
import CompaniesGoianiaController from './controllers/CompaniesGoianiaController'
import CompaniesGoianiaQtdNotes from './controllers/CompaniesGoianiaQtdNotes'
import LogPrefGoianiaController from './controllers/LogPrefGoianiaController'
import LogPrefGoianiaErrors from './controllers/LogPrefGoianiaErrors'
import LogPrefGoianiaMaxDateEndDown from './controllers/LogPrefGoianiaMaxDateEndDown'
import NotesNfseController from './controllers/NotesNfseController'
import PrefGoianiaAccessController from './controllers/PrefGoianiaAccessController'
import SettingsWayFilesController from './controllers/SettingsWayFilesController'

// methods commom in controller are: index, show, create, update, delete

const routes = express.Router()
const companiesController = new CompaniesController()
const companiesGoianiaController = new CompaniesGoianiaController()
const companiesGoianiaQtdNotes = new CompaniesGoianiaQtdNotes()
const prefGoianiaAccessController = new PrefGoianiaAccessController()
const logPrefGoianiaController = new LogPrefGoianiaController()
const logPrefGoianiaErrors = new LogPrefGoianiaErrors()
const logPrefGoianiaMaxDateEndDown = new LogPrefGoianiaMaxDateEndDown()
const settingsWayFilesController = new SettingsWayFilesController()
const notesNfseController = new NotesNfseController()

routes.get('/companies', companiesController.index)
routes.put('/companies', companiesController.upsert)

routes.get('/companies_goiania', companiesGoianiaController.index)
routes.put('/companies_goiania', companiesGoianiaController.upsert)
routes.get('/companies_goiania_qtd_notes', companiesGoianiaQtdNotes.index)

routes.get('/pref_goiania_access', prefGoianiaAccessController.index)
routes.put('/pref_goiania_access', prefGoianiaAccessController.upsert)
routes.put('/pref_goiania_access_upsert_many', prefGoianiaAccessController.upsertMany)

routes.get('/log_pref_goiania', logPrefGoianiaController.index)
routes.post('/log_pref_goiania', logPrefGoianiaController.store)
routes.get('/log_pref_goiania_max_date_down', logPrefGoianiaMaxDateEndDown.show)
routes.get('/log_pref_goiania_errors', logPrefGoianiaErrors.index)

routes.get('/settings_way_files', settingsWayFilesController.index)
routes.put('/settings_way_files/:id', settingsWayFilesController.upsert)

routes.get('/notes_nfse', notesNfseController.index)
routes.put('/notes_nfse', notesNfseController.upsert)

export default routes