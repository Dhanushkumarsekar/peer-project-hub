// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../api/axios';

// const CreateProject = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     techStack: '',
//     githubUrl: '',
//     liveUrl: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const projectData = {
//         ...formData,
//         techStack: formData.techStack.split(',').map(tech => tech.trim()).filter(Boolean),
//       };

//       await axios.post('/projects', projectData);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create project');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Create New Project</h1>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Title *
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Description *
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             rows="4"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Tech Stack (comma-separated)
//           </label>
//           <input
//             type="text"
//             name="techStack"
//             value={formData.techStack}
//             onChange={handleChange}
//             placeholder="React, Node.js, MongoDB"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             GitHub URL
//           </label>
//           <input
//             type="url"
//             name="githubUrl"
//             value={formData.githubUrl}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Live URL
//           </label>
//           <input
//             type="url"
//             name="liveUrl"
//             value={formData.liveUrl}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
//           >
//             {loading ? 'Creating...' : 'Create Project'}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/')}
//             className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateProject;


// import React, { useState } from 'react';
// import api from '../api/axios';
// import { useNavigate } from 'react-router-dom';

// export default function CreateProject() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [tags, setTags] = useState('');
//   const [githubLink, setGithubLink] = useState('');
//   const [liveLink, setLiveLink] = useState('');
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = { title, description, tags: tags.split(',').map(t => t.trim()).filter(Boolean), githubLink, liveLink };
//       const res = await api.post('/projects', payload);
//       navigate(`/projects/${res.data._id}`);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create. Make sure you are logged in.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Create Project</h2>
//       <form onSubmit={submit} className="space-y-3">
//         <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" required />
//         <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" rows={6} />
//         <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" className="w-full border p-2 rounded" />
//         <input value={githubLink} onChange={e => setGithubLink(e.target.value)} placeholder="GitHub URL" className="w-full border p-2 rounded" />
//         <input value={liveLink} onChange={e => setLiveLink(e.target.value)} placeholder="Live URL (optional)" className="w-full border p-2 rounded" />
//         <button className="p-2 bg-green-600 text-white rounded">Create</button>
//       </form>
//     </div>
//   );
// }



import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        githubLink,
        liveLink,
      };
      const res = await api.post('/projects', payload);
      navigate(`/projects/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create project (Login required)');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100">
      <form
        onSubmit={submit}
        className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          🚀 Create New Project
        </h2>

        <input className="w-full border-b-2 border-indigo-300 focus:border-indigo-600 outline-none p-2 mb-4" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="w-full border-b-2 border-indigo-300 focus:border-indigo-600 outline-none p-2 mb-4" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input className="w-full border-b-2 border-indigo-300 focus:border-indigo-600 outline-none p-2 mb-4" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <input className="w-full border-b-2 border-indigo-300 focus:border-indigo-600 outline-none p-2 mb-4" placeholder="GitHub Link" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
        <input className="w-full border-b-2 border-indigo-300 focus:border-indigo-600 outline-none p-2 mb-6" placeholder="Live Link (optional)" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />

        <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-2 rounded-md font-semibold hover:scale-105 transition">
          Create Project
        </button>
      </form>
    </div>
  );
}
