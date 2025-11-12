// import React, { useState } from 'react';
// import { auth } from '../firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// const Auth = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         await createUserWithEmailAndPassword(auth, email, password);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {isLogin ? 'Login' : 'Sign Up'}
//         </h2>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//           >
//             {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
//           </button>
//         </form>

//         <p className="text-center mt-4 text-sm text-gray-600">
//           {isLogin ? "Don't have an account? " : 'Already have an account? '}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-blue-500 hover:underline"
//           >
//             {isLogin ? 'Sign Up' : 'Login'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;


import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const a = getAuth();
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(a, email, password);
      } else {
        await createUserWithEmailAndPassword(a, email, password);
      }
      window.location.href = '/';
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">{mode === 'login' ? 'Login' : 'Sign up'}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded" required />
        <button className="w-full p-2 bg-blue-600 text-white rounded">{mode === 'login' ? 'Login' : 'Create account'}</button>
      </form>
      <div className="mt-3 text-sm text-center">
        <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="underline">
          {mode === 'login' ? 'Create account' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );
}
