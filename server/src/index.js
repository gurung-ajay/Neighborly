import express from 'express'
import UserRoute from './routes/user.route.js'
import dbConnect from './db/connection.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors()) // configured cors for frontend and backend connection without port number issue

app.use('/', UserRoute)

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server listening on port ${PORT}`)
})
