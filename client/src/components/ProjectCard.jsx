// import React from 'react';
// import { Link } from 'react-router-dom';
// import { auth } from '../firebase';

// const ProjectCard = ({ project, onToggleFavorite }) => {
//   const currentUser = auth.currentUser;
//   const isFavorited = project.favorites?.includes(currentUser?.uid);
//   const isOwner = project.authorId === currentUser?.uid;

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
//         <button
//           onClick={() => onToggleFavorite(project._id)}
//           className={`text-2xl ${isFavorited ? 'text-red-500' : 'text-gray-300'}`}
//         >
//           ♥
//         </button>
//       </div>

//       <p className="text-gray-600 mb-4">{project.description}</p>

//       <div className="flex flex-wrap gap-2 mb-4">
//         {project.techStack?.map((tech, index) => (
//           <span
//             key={index}
//             className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
//           >
//             {tech}
//           </span>
//         ))}
//       </div>

//       <div className="flex justify-between items-center text-sm text-gray-500">
//         <span>By {project.authorEmail}</span>
//         <span>{project.favorites?.length || 0} ♥</span>
//       </div>

//       <div className="mt-4 flex gap-2">
//         {project.githubUrl && (
//           <a
//             href={project.githubUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline"
//           >
//             GitHub
//           </a>
//         )}
//         {project.liveUrl && (
//           <a
//             href={project.liveUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 hover:underline"
//           >
//             Live Demo
//           </a>
//         )}
//       </div>

//       <Link
//         to={`/project/${project._id}`}
//         className="block mt-4 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//       >
//         View Details
//       </Link>
//     </div>
//   );
// };

// export default ProjectCard;


// import React, { useState } from 'react';
// import api from '../api/axios';
// import { Link } from 'react-router-dom';

// export default function ProjectCard({ project }) {
//   const initialFav = Array.isArray(project.favorites) && project.favorites.length > 0;
//   const [fav, setFav] = useState(initialFav);
//   const [likes, setLikes] = useState(project.likes || 0);

//   const toggleFav = async () => {
//     try {
//       const res = await api.post(`/projects/${project._id}/favorite`);
//       setFav(res.data.favorites.some(f => f.uid));
//     } catch (err) {
//       alert('Login required to favorite or an error occurred');
//     }
//   };

//   return (
//     <div className="p-4 border rounded bg-white">
//       <div className="flex justify-between">
//         <div>
//           <Link to={`/projects/${project._id}`} className="text-lg font-semibold">{project.title}</Link>
//           <div className="text-xs text-gray-500">{project.createdBy?.name || project.createdBy?.email}</div>
//         </div>
//         <div className="flex flex-col items-end">
//           <button onClick={toggleFav} className="px-2 py-1 border rounded text-sm">
//             {fav ? '★ Favorited' : '☆ Favorite'}
//           </button>
//           <div className="text-sm mt-2">{likes} likes</div>
//         </div>
//       </div>
//       <p className="mt-2 text-gray-700">{project.description?.slice(0, 220)}{project.description?.length > 220 ? '...' : ''}</p>
//       <div className="mt-3 space-x-2">
//         {project.tags?.map(t => <span key={t} className="text-xs border px-2 py-0.5 rounded">{t}</span>)}
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  const [fav, setFav] = useState(project.favorites?.length > 0);

  const toggleFav = async () => {
    try {
      const res = await api.post(`/projects/${project._id}/favorite`);
      setFav(res.data.favorites.some((f) => f.uid));
    } catch (err) {
      alert('Login required to favorite');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transform transition duration-300">
      <Link to={`/projects/${project._id}`} className="text-xl font-semibold text-indigo-700 hover:underline">
        {project.title}
      </Link>
      <p className="mt-2 text-gray-600 line-clamp-3">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags?.map((t) => (
          <span key={t} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <a href={project.githubLink} className="text-sm text-blue-500 hover:underline" target="_blank" rel="noreferrer">
          GitHub →
        </a>
        <button
          onClick={toggleFav}
          className={`px-3 py-1 rounded-md text-sm ${
            fav ? 'bg-pink-200 text-pink-600' : 'bg-gray-100 text-gray-700'
          }`}
        >
          {fav ? '♥ Favorite' : '♡ Add Fav'}
        </button>
      </div>
    </div>
  );
}
