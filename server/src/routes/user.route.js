import Router from 'express'
import { getUser, Login, Register } from '../controllers/user.controller.js'

const routes = Router()

routes.get('/', getUser)
routes.post('/register', Register)
routes.post('/login', Login)

export default routes