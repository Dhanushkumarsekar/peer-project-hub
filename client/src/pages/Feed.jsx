// import React, { useState, useEffect } from 'react';
// import axios from '../api/axios';
// import ProjectCard from '../components/ProjectCard';

// const Feed = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get('/projects');
//       setProjects(response.data);
//     } catch (err) {
//       setError('Failed to load projects');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleFavorite = async (projectId) => {
//     try {
//       const response = await axios.post(`/projects/${projectId}/favorite`);
//       setProjects(projects.map(p => 
//         p._id === projectId ? response.data : p
//       ));
//     } catch (err) {
//       console.error('Failed to toggle favorite:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl">Loading projects...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl text-red-500">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold mb-8">Project Feed</h1>
      
//       {projects.length === 0 ? (
//         <p className="text-gray-500 text-center">No projects yet. Create one!</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <ProjectCard
//               key={project._id}
//               project={project}
//               onToggleFavorite={handleToggleFavorite}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feed;


// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import ProjectCard from '../components/ProjectCard';

// export default function Feed() {
//   const [projects, setProjects] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const load = async () => {
//     try {
//       const res = await api.get(`/projects?page=${page}&limit=10`);
//       setProjects(res.data.projects || []);
//       setTotal(res.data.total || 0);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load feed');
//     }
//   };

//   useEffect(() => { load(); }, [page]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Project Feed</h1>
//       <div className="space-y-4">
//         {projects.map(p => <ProjectCard key={p._id} project={p} />)}
//       </div>
//       <div className="mt-6 flex justify-between items-center">
//         <button onClick={() => setPage(p => Math.max(1, p - 1))} className="btn" disabled={page <= 1}>Prev</button>
//         <div>Page {page} • {total} projects</div>
//         <button onClick={() => setPage(p => p + 1)} className="btn">Next</button>
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import ProjectCard from '../components/ProjectCard';
// import { motion } from 'framer-motion';

// export default function Feed() {
//   const [projects, setProjects] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const load = async () => {
//     try {
//       const res = await api.get(`/projects?page=${page}&limit=10`);
//       setProjects(res.data.projects || []);
//       setTotal(res.data.total || 0);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load projects');
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [page]);

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">🌟 Project Feed</h1>

//       {projects.length === 0 ? (
//         <p className="text-center text-gray-500 text-lg">No projects yet. Create one to get started!</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((p) => (
//             <motion.div
//               key={p._id}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: 'spring', stiffness: 150 }}
//             >
//               <ProjectCard project={p} />
//             </motion.div>
//           ))}
//         </div>
//       )}

//       <div className="mt-8 flex justify-between items-center">
//         <button
//           disabled={page <= 1}
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:opacity-50 hover:bg-indigo-700"
//         >
//           Prev
//         </button>
//         <p className="text-gray-700">
//           Page {page} • {total} projects
//         </p>
//         <button
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

export default function Feed() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // ✅ useCallback ensures stable reference to load()
  const load = useCallback(async () => {
    try {
      const res = await api.get(`/projects?page=${page}&limit=10`);
      setProjects(res.data.projects || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error(err);
      alert('Failed to load projects');
    }
  }, [page]); // only re-creates when 'page' changes

  // ✅ Now useEffect dependency array is safe and lint-clean
  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        🌟 Project Feed
      </h1>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No projects yet. Create one to get started!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between items-center">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md disabled:opacity-50 hover:bg-indigo-700"
        >
          Prev
        </button>

        <p className="text-gray-700">
          Page {page} • {total} projects
        </p>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
