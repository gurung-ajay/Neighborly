import Router from 'express'
import { getUser } from '../controllers/user.controller.js'

const routes = Router()

routes.get('/', getUser)

export default routes