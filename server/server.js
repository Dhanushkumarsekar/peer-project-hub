// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');

// const projectRoutes = require('./routes/projects');
// const commentRoutes = require('./routes/comments');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/projects', projectRoutes);
// app.use('/api/comments', commentRoutes);

// // Health check
// app.get('/', (req, res) => {
//   res.json({ message: 'Peer Project Hub API is running!' });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const admin = require('firebase-admin');
const projectsRoute = require('./routes/projects');
const commentsRoute = require('./routes/comments');
const firebaseAuth = require('./middleware/firebaseAuth');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize firebase-admin using env vars
const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY || '';

if (firebasePrivateKey) firebasePrivateKey = firebasePrivateKey.replace(/\\n/g, '\n');

if (firebaseProjectId && firebaseClientEmail && firebasePrivateKey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseProjectId,
      clientEmail: firebaseClientEmail,
      privateKey: firebasePrivateKey
    })
  });
  console.log('Firebase admin initialized with env vars');
} else {
  // Fallback: allow use of GOOGLE_APPLICATION_CREDENTIALS JSON file path if provided
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    admin.initializeApp();
    console.log('Firebase admin initialized using GOOGLE_APPLICATION_CREDENTIALS');
  } else {
    console.warn('Firebase admin not initialized. Set FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY or GOOGLE_APPLICATION_CREDENTIALS.');
  }
}

// Attach firebaseAuth middleware (it will gracefully allow unauthenticated requests)
app.use(firebaseAuth);

// Routes
app.use('/api/projects', projectsRoute);
app.use('/api/comments', commentsRoute);

// Basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Start server after DB connect
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to start server', err);
  });
