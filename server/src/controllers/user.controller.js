import User from "../models/user.model.js"
import bcrypt from 'bcrypt'

const getUser = async (req, res) => {
    res.send('Hello World!')
}

const createUser = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        await User.create(req.body)
        res.status(200).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' })
    }
}

export { getUser, createUser }