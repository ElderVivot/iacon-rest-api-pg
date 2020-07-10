import express from 'express'

import CompaniesController from './controllers/CompaniesController'
import LogPrefGoianiaController from './controllers/LogPrefGoianiaController'
import PrefGoianiaAccessController from './controllers/PrefGoianiaAccessController'
import SettingsDownNotesController from './controllers/SettingsDownNotesController'

// methods commom in controller are: index, show, create, update, delete

const routes = express.Router()
const companiesController = new CompaniesController()
const prefGoianiaAccessController = new PrefGoianiaAccessController()
const logPrefGoianiaController = new LogPrefGoianiaController()
const settingsDownNotesController = new SettingsDownNotesController()

routes.get('/companies', companiesController.index)
routes.put('/companies', companiesController.upsert)

routes.get('/pref_goiania_access', prefGoianiaAccessController.index)
routes.put('/pref_goiania_access', prefGoianiaAccessController.upsertMany)

routes.get('/log_pref_goiania', logPrefGoianiaController.index)
routes.post('/log_pref_goiania', logPrefGoianiaController.store)
routes.get('/log_pref_goiania_max_date_down', logPrefGoianiaController.showMaxDateEndDown)

routes.get('/settings_down_notes', settingsDownNotesController.index)
routes.put('/settings_down_notes/:id', settingsDownNotesController.upsert)

export default routes