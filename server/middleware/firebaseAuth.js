// const admin = require('firebase-admin');

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   }),
// });

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split('Bearer ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = {
//       uid: decodedToken.uid,
//       email: decodedToken.email,
//     };
//     next();
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return res.status(403).json({ message: 'Invalid token' });
//   }
// };

// module.exports = verifyToken;


const admin = require('firebase-admin');

const firebaseAuth = async (req, res, next) => {
  // If admin not initialized, skip attaching user (req.user stays undefined)
  if (!admin.apps || admin.apps.length === 0) {
    req.user = null;
    return next();
  }

  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }
  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || decoded.email
    };
    return next();
  } catch (err) {
    // token invalid/expired -> treat as unauthenticated
    req.user = null;
    return next();
  }
};

module.exports = firebaseAuth;
