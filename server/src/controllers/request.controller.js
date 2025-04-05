import Request from "../models/request.model.js"
import User from "../models/user.model.js"

const getRequests = async (req, res) => {
    try {
        const requests = await Request.find({})
        const requestsWithLocations = await Promise.all(requests.map(async request => {
            const poster = await User.findById(request.postedBy)
            return {...request, location: poster.home_address}
        }))
        console.log(requestsWithLocations)
        res.status(200).json({ data: requestsWithLocations })
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch requests' })
    }
}

const postRequest = async (req, res) => {
    try {
        const request = await Request.create(req.body)
        res.status(200).json({ message: 'Request created successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create request' })
    }
}

const getRequestLocations = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)
        const postedBy = await User.findById(id)
        console.log(postedBy)
        const location = postedBy.home_address
        res.status(200).json({data:location})
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch locations' })
    }
}

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await Request.findByIdAndDelete(id);
    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete request' });
  }
}

export { getRequests, postRequest, getRequestLocations, deleteRequest }