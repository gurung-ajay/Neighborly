import Router from 'express'
import { postHelpOffer } from '../controllers/helpOffer.controller.js'

const routes = Router()

routes.post('/', postHelpOffer)

export default routes
