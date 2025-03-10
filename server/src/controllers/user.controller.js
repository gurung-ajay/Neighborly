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


const Login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ message: 'User not found' })
        const passwordMatch = await bcrypt.compare(req.body.password, user.password)
        if (!passwordMatch) return res.status(401).json({ message: 'Invalid password' })
        res.status(200).json({ message: 'Login successful' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to login' })
    }
}

export { getUser, createUser, Login }