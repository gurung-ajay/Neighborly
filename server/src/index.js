import express from 'express'
import UserRoute from './routes/user.route.js'
import RequestRoute from './routes/request.route.js'
import HelpOfferRoute from './routes/helpOffer.route.js'
import dbConnect from './db/connection.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors()) // configured cors for frontend and backend connection without port number issue

app.use('/user', UserRoute)
app.use('/request', RequestRoute)
app.use('/helpOffer', HelpOfferRoute)

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server listening on port ${PORT}`)
})
