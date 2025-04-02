# Neighborly - Community Service Network

A MERN stack application that connects neighbors for community service and support through a location-based request system.

## 🎯 Objective

Neighborly aims to foster stronger community bonds by providing a platform where neighbors can:
- Request help and support from nearby residents
- Offer assistance to those in need
- Connect based on geographical proximity
- Build a supportive community network

## 🚀 Technologies Used

- **Frontend**: Next.js, React.js, Redux, React Leaflet
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Mapping**: Leaflet.js
- **Authentication**: JWT

## 🌟 Features

### Location-Based Services
- Interactive map interface using Leaflet
- User location tracking and display
- Nearby request markers on the map
- Custom map markers for different types of requests

### Request System
- Create and post service requests
- View nearby requests on the map
- Accept and respond to requests
- Location-based request filtering
- Real-time request updates

### User Management
- User authentication and authorization
- Profile management
- Home address management for location services
- User activity tracking

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Start the development servers
```bash
# Start server
cd server
npm run dev

# Start client
cd ../client
npm run dev
```

## 📁 Project Structure

```
neighborly/
├── client/              # Next.js frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── app/        # Routes and pages
├── server/              # Node.js backend
│   ├── src/
│   │   ├── controllers/ # API controllers
│   │   ├── models/     # MongoDB models
│   │   └── routes/     # API routes
└── README.md          # This file
```

## 📝 API Documentation

- **GET /api/requests/request** - Fetch all requests with locations
- **POST /api/requests/request** - Create a new request
- **GET /api/requests/request_location/:id** - Get user's location for requests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Thanks to the Leaflet.js team for the excellent mapping library
- Special thanks to the MERN stack community for their support and resources
