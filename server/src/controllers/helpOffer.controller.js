import HelpOffer from "../models/helpOffer.model.js"

const postHelpOffer = async (req, res) => {
    try {
        const helpOffer = await HelpOffer.create(req.body)
        res.status(200).json({ message: 'Help offer created successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to create help offer' })
    }
}

export { postHelpOffer }
