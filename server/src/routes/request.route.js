import Router from 'express'
import { deleteRequest, getRequestLocations, getRequests, postRequest } from '../controllers/request.controller.js'

const routes = Router()

routes.get('/', getRequests)
routes.post('/', postRequest)
routes.get('/request_location/:id', getRequestLocations)
routes.delete('/delete/:id', deleteRequest)

export default routes