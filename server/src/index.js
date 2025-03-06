import express from 'express'
import UserRoute from './routes/user.route.js'
import dbConnect from './db/connection.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', UserRoute)

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server listening on port ${PORT}`)
})
