import Router from 'express'
import { Login, Register, getRequestLocations } from '../controllers/user.controller.js'

const routes = Router()

routes.get('/request_locations', getRequestLocations)
routes.post('/register', Register)
routes.post('/login', Login)

export default routes