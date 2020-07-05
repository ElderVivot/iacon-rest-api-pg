import express from 'express'

import CompaniesController from './controllers/CompaniesController'
import PrefGoianiaAccessController from './controllers/PrefGoianiaAccessController'

// methods commom in controller are: index, show, create, update, delete

const routes = express.Router()
const companiesController = new CompaniesController()
const prefGoianiaAccessController = new PrefGoianiaAccessController()

routes.get('/companies', companiesController.index)
routes.put('/companies', companiesController.upsert)

routes.get('/pref_goiania_access', prefGoianiaAccessController.index)
routes.put('/pref_goiania_access', prefGoianiaAccessController.upsertMany)

export default routes