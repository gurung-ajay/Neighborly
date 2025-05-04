# Neighborly - Community Service Network

A MERN stack application that connects neighbors for community service and support through a location-based request system.

![スクリーンショット 2025-05-04 105932](https://github.com/user-attachments/assets/6a963ec7-1487-4fa2-bbf3-a89c82bbd05a)


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
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Environment Setup

1. Create a `.env` file in both client and server directories:

   **Client (.env):**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:9000
   ```

   **Server (.env):**
   ```
   PORT=9000
   MONGODB_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   ```

   **Important:**
   - Add `.env` to your `.gitignore` file
   - Create a `.env.example` file in both directories to show required environment variables without actual values
   - In Next.js, only variables prefixed with `NEXT_PUBLIC_` are accessible on the client side

### Installation

1. Clone the repository
```bash
git clone https://github.com/gurung-ajay/Neighborly.git
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
