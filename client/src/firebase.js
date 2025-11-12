// // import { initializeApp } from 'firebase/app';
// // import { getAuth } from 'firebase/auth';

// // const firebaseConfig = {
// //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
// //   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// //   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// //   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// // };

// // const app = initializeApp(firebaseConfig);
// // export const auth = getAuth(app);


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export default app;



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBaaZWPpEFFHiv7bN5GKet_ZAy4h6EUkss",
//   authDomain: "peer-project-hub-4be69.firebaseapp.com",
//   projectId: "peer-project-hub-4be69",
//   storageBucket: "peer-project-hub-4be69.firebasestorage.app",
//   messagingSenderId: "1047044608287",
//   appId: "1:1047044608287:web:75c5775c8bc7d3fe30a02a",
//   measurementId: "G-7R4S2QEWKR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



// Import required Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBaaZWPpEFFHiv7bN5GKet_ZAy4h6EUkss",
  authDomain: "peer-project-hub-4be69.firebaseapp.com",
  projectId: "peer-project-hub-4be69",
  storageBucket: "peer-project-hub-4be69.firebasestorage.app",
  messagingSenderId: "1047044608287",
  appId: "1:1047044608287:web:75c5775c8bc7d3fe30a02a",
  measurementId: "G-7R4S2QEWKR"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// ✅ Optional default export (if needed elsewhere)
export default app;
