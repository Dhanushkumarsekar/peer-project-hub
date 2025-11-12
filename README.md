node server.js
npx react-scripts start



# Peer Project Hub

A full-stack web application where students can share and discover peer projects with authentication, favorites, and commenting features.

## 🚀 Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Firebase Admin SDK (Authentication)

### Frontend
- React + React Router
- Tailwind CSS
- Firebase Client SDK (Authentication)
- Axios

## 📁 Project Structure

```
peer-project-hub/
├── server/                      # Backend API
│   ├── config/                  # Database configuration
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Firebase auth middleware
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # API routes
│   ├── server.js                # Entry point
│   ├── package.json
│   └── .env.example
│
├── client/                      # Frontend React app
│   ├── src/
│   │   ├── api/                 # Axios configuration
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── firebase.js          # Firebase config
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Firebase Project (for authentication)

### 1. Clone or Extract the Project

```bash
cd peer-project-hub
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Email/Password** authentication in Authentication section
4. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely
5. Get your web app config from Project Settings > General

### 3. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/peer-project-hub
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

**Note:** For `FIREBASE_PRIVATE_KEY`, copy the private key from your Firebase service account JSON file.

Start the server:

```bash
npm run dev    # Development with nodemon
# or
npm start      # Production
```

Server will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file based on `.env.example`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

Start the React app:

```bash
npm start
```

App will run on `http://localhost:3000`

## 🎯 Features

- **Authentication**: Sign up and login with email/password via Firebase
- **Project Management**: Create, view, and delete your projects
- **Favorites**: Like projects from other users
- **Comments**: Comment on projects and engage with the community
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## 📡 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `POST /api/projects/:id/favorite` - Toggle favorite (protected)

### Comments
- `GET /api/comments/project/:projectId` - Get comments for a project
- `POST /api/comments/project/:projectId` - Create comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## 🔒 Authentication

Protected routes require a Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

The frontend automatically handles this via Axios interceptors.

## 🛠️ Development

### MongoDB
Make sure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### Testing the API
You can use tools like Postman or Thunder Client to test the API endpoints.

## 📦 Production Deployment

### Backend
1. Set environment variables on your hosting platform
2. Deploy to services like Heroku, Railway, or Render
3. Update `MONGO_URI` to production database

### Frontend
1. Update `REACT_APP_API_URL` to production API URL
2. Build the app: `npm run build`
3. Deploy to Vercel, Netlify, or any static hosting

## 🤝 Contributing

Feel free to fork this project and submit pull requests!

## 📄 License

MIT License - feel free to use this project for learning or your own applications.















# Peer Project Hub

Minimal full-stack project: Node/Express + MongoDB backend; React + Tailwind frontend; Firebase Authentication.

## Quick start

### Backend
1. `cd server`
2. copy `.env.example` -> `.env` and fill values (MONGO_URI, firebase service account env or GOOGLE_APPLICATION_CREDENTIALS)
3. `npm install`
4. `npm run dev`

### Frontend
1. `cd client`
2. copy `.env.example` -> `.env` and fill your Firebase web config & API URL
3. `npm install`
4. `npm start`

Visit `http://localhost:3000` for frontend and `http://localhost:5000/api/health` for backend check.

## Notes
- Use Firebase Email/Password sign-in (enable in Firebase console).
- Server verifies Firebase ID token via firebase-admin.
- Do not commit private keys or `.env`.
