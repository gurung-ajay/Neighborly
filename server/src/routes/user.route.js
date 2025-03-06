import Router from 'express'
import { getUser, createUser } from '../controllers/user.controller.js'

const routes = Router()

routes.get('/', getUser)
routes.post('/', createUser)

export default routes