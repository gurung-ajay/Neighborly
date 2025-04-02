import Router from 'express'
import { getRequestLocations, getRequests, postRequest } from '../controllers/request.controller.js'

const routes = Router()

routes.get('/', getRequests)
routes.post('/', postRequest)
routes.get('/request_location/:id', getRequestLocations)

export default routes