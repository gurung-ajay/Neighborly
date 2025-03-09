import User from "../models/user.model.js"
import bcrypt from 'bcrypt'

const getUser = async (req, res) => {
    res.send('Hello World!')
}

const createUser = async (req, res) => {
    try {
        const emailTaken = await User.findOne({ email: req.body.email })
        if (emailTaken) return res.status(409).json({ message: 'Email already taken' })

        req.body.password = await bcrypt.hash(req.body.password, 10)
        await User.create(req.body)
        res.status(200).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' })
    }
}

export { getUser, createUser }