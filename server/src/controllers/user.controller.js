import User from "../models/user.model.js"

const getUser = async (req, res) => {
    res.send('Hello World!')
}

const createUser = async (req, res) => {
    try {
        await User.create(req.body)
        res.status(200).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' })
    }
}

export { getUser, createUser }