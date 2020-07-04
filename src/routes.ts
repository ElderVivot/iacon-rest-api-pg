import express from 'express'

import CompaniesController from './controllers/CompaniesController'

// methods commom in controller are: index, show, create, update, delete

const routes = express.Router()
const companiesController = new CompaniesController()

routes.get('/companies', companiesController.index)
routes.put('/companies', companiesController.upsert)

export default routes