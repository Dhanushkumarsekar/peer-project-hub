// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';

// import Auth from './pages/Auth';
// import Feed from './pages/Feed';
// import CreateProject from './pages/CreateProject';
// import ProjectDetail from './pages/ProjectDetail';

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         {user && (
//           <nav className="bg-white shadow-md">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//               <div className="flex justify-between h-16 items-center">
//                 <Link to="/" className="text-2xl font-bold text-blue-600">
//                   Peer Project Hub
//                 </Link>
//                 <div className="flex space-x-4 items-center">
//                   <Link to="/" className="text-gray-700 hover:text-blue-600">
//                     Feed
//                   </Link>
//                   <Link to="/create" className="text-gray-700 hover:text-blue-600">
//                     Create Project
//                   </Link>
//                   <span className="text-sm text-gray-600">{user.email}</span>
//                   <button
//                     onClick={handleLogout}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         )}

//         <Routes>
//           <Route
//             path="/auth"
//             element={!user ? <Auth /> : <Navigate to="/" />}
//           />
//           <Route
//             path="/"
//             element={user ? <Feed /> : <Navigate to="/auth" />}
//           />
//           <Route
//             path="/create"
//             element={user ? <CreateProject /> : <Navigate to="/auth" />}
//           />
//           <Route
//             path="/project/:id"
//             element={user ? <ProjectDetail /> : <Navigate to="/auth" />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import Feed from './pages/Feed';
// import ProjectDetail from './pages/ProjectDetail';
// import CreateProject from './pages/CreateProject';
// import Auth from './pages/Auth';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth'

// ;


// export default function App() {
//   const [user, setUser] = React.useState(null);

//   React.useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
//     return () => unsub();
//   }, []);

//   const logout = async () => {
//     await auth.signOut();
//     window.location.href = '/';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow p-4">
//         <div className="max-w-4xl mx-auto flex justify-between items-center">
//           <Link to="/" className="font-bold text-xl">Peer Project Hub</Link>
//           <div className="space-x-3">
//             <Link to="/" className="btn">Feed</Link>
//             <Link to="/create" className="btn">Create</Link>
//             {!user ? <Link to="/auth" className="btn">Login</Link> :
//               <button onClick={logout} className="btn">Logout</button>}
//           </div>
//         </div>
//       </nav>

//       <main className="py-8">
//         <div className="max-w-4xl mx-auto">
//           <Routes>
//             <Route path="/" element={<Feed />} />
//             <Route path="/projects/:id" element={<ProjectDetail />} />
//             <Route path="/create" element={<CreateProject />} />
//             <Route path="/auth" element={<Auth />} />
//           </Routes>
//         </div>
//       </main>
//     </div>
//   );
// }



import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Feed from './pages/Feed';
import ProjectDetail from './pages/ProjectDetail';
import CreateProject from './pages/CreateProject';
import Auth from './pages/Auth';
import Footer from './components/Footer';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsub();
  }, []);

  const logout = async () => {
    await auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAVBAR */}
      <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-white">
          <Link to="/" className="text-2xl font-extrabold tracking-wide">
            Peer Project Hub
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-yellow-200 transition">Feed</Link>
            <Link to="/create" className="hover:text-yellow-200 transition">Create</Link>
            {!user ? (
              <Link
                to="/auth"
                className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-yellow-300 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={logout}
                className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-red-400 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
