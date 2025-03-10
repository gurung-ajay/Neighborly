import Router from 'express'
import { getUser, createUser, Login } from '../controllers/user.controller.js'

const routes = Router()

routes.get('/', getUser)
routes.post('/register', createUser)
routes.post('/login', Login)

export default routes