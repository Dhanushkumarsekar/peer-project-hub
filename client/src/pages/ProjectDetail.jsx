// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../api/axios';
// import CommentList from '../components/CommentList';
// import { auth } from '../firebase';

// const ProjectDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const currentUser = auth.currentUser;
//   const isOwner = project?.authorId === currentUser?.uid;

//   useEffect(() => {
//     fetchProjectAndComments();
//   }, [id]);

//   const fetchProjectAndComments = async () => {
//     try {
//       const [projectRes, commentsRes] = await Promise.all([
//         axios.get(`/projects/${id}`),
//         axios.get(`/comments/project/${id}`)
//       ]);
//       setProject(projectRes.data);
//       setComments(commentsRes.data);
//     } catch (err) {
//       setError('Failed to load project details');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     try {
//       const response = await axios.post(`/comments/project/${id}`, {
//         text: newComment
//       });
//       setComments([response.data, ...comments]);
//       setNewComment('');
//     } catch (err) {
//       console.error('Failed to add comment:', err);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await axios.delete(`/comments/${commentId}`);
//       setComments(comments.filter(c => c._id !== commentId));
//     } catch (err) {
//       console.error('Failed to delete comment:', err);
//     }
//   };

//   const handleDeleteProject = async () => {
//     if (!window.confirm('Are you sure you want to delete this project?')) return;

//     try {
//       await axios.delete(`/projects/${id}`);
//       navigate('/');
//     } catch (err) {
//       console.error('Failed to delete project:', err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl">Loading...</div>
//       </div>
//     );
//   }

//   if (error || !project) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-xl text-red-500">{error || 'Project not found'}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-md p-8 mb-8">
//         <div className="flex justify-between items-start mb-4">
//           <h1 className="text-3xl font-bold">{project.title}</h1>
//           {isOwner && (
//             <button
//               onClick={handleDeleteProject}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             >
//               Delete Project
//             </button>
//           )}
//         </div>

//         <p className="text-gray-600 mb-6">{project.description}</p>

//         <div className="flex flex-wrap gap-2 mb-6">
//           {project.techStack?.map((tech, index) => (
//             <span
//               key={index}
//               className="bg-blue-100 text-blue-800 px-3 py-1 rounded"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>

//         <div className="flex gap-4 mb-4">
//           {project.githubUrl && (
//             <a
//               href={project.githubUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               GitHub Repository →
//             </a>
//           )}
//           {project.liveUrl && (
//             <a
//               href={project.liveUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 hover:underline"
//             >
//               Live Demo →
//             </a>
//           )}
//         </div>

//         <div className="text-sm text-gray-500">
//           <p>Created by: {project.authorEmail}</p>
//           <p>Favorites: {project.favorites?.length || 0}</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold mb-6">Comments</h2>

//         <form onSubmit={handleAddComment} className="mb-6">
//           <textarea
//             value={newComment}
//             onChange={(e) => setNewComment(e.target.value)}
//             placeholder="Add a comment..."
//             rows="3"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//           >
//             Post Comment
//           </button>
//         </form>

//         <CommentList comments={comments} onDelete={handleDeleteComment} />
//       </div>
//     </div>
//   );
// };

// export default ProjectDetail;


// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import { useParams } from 'react-router-dom';
// import CommentList from '../components/CommentList';

// export default function ProjectDetail() {
//   const { id } = useParams();
//   const [project, setProject] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [text, setText] = useState('');

//   const load = async () => {
//     try {
//       const res = await api.get(`/projects/${id}`);
//       setProject(res.data);
//       const c = await api.get(`/comments/project/${id}`);
//       setComments(c.data || []);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load project');
//     }
//   };

//   useEffect(() => { load(); }, [id]);

//   const postComment = async () => {
//     try {
//       await api.post('/comments', { projectId: id, text });
//       setText('');
//       load();
//     } catch (err) {
//       alert('Failed to post comment. Make sure you are logged in.');
//     }
//   };

//   if (!project) return <div>Loading...</div>;

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-bold">{project.title}</h1>
//       <div className="text-sm text-gray-500 mt-1">{project.createdBy?.name || project.createdBy?.email}</div>
//       <p className="mt-4 text-gray-700">{project.description}</p>
//       {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="block mt-2 text-blue-600">GitHub Repo</a>}
//       {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="block mt-1 text-blue-600">Live Demo</a>}

//       <div className="mt-6">
//         <h2 className="text-lg font-semibold">Comments</h2>
//         <CommentList comments={comments} />
//         <div className="mt-4">
//           <textarea value={text} onChange={e => setText(e.target.value)} className="w-full border p-2 rounded" rows={3} />
//           <div className="mt-2">
//             <button onClick={postComment} className="p-2 bg-blue-600 text-white rounded">Post Comment</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState, useCallback } from 'react';
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  // ✅ useCallback prevents re-creation of load() every render
  const load = useCallback(async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);

      const c = await api.get(`/comments/project/${id}`);
      setComments(c.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load project');
    }
  }, [id]); // dependency ensures it re-fetches only when id changes

  // ✅ Safe and lint-clean useEffect
  useEffect(() => {
    load();
  }, [load]);

  const postComment = async () => {
    try {
      await api.post('/comments', { projectId: id, text });
      setText('');
      load();
    } catch (err) {
      alert('Failed to post comment. Make sure you are logged in.');
    }
  };

  if (!project)
    return (
      <div className="text-center p-6 text-lg text-gray-500 animate-pulse">
        Loading project details...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-10 rounded-2xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-indigo-700">{project.title}</h1>
      <div className="text-sm text-gray-500 mt-1">
        Created by: {project.createdBy?.name || project.createdBy?.email || 'Unknown'}
      </div>

      <p className="mt-4 text-gray-700 leading-relaxed">{project.description}</p>

      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
          className="block mt-3 text-blue-600 hover:underline"
        >
          🔗 GitHub Repo
        </a>
      )}

      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          className="block mt-1 text-green-600 hover:underline"
        >
          🚀 Live Demo
        </a>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-indigo-700 mb-2">💬 Comments</h2>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <CommentList comments={comments} />
        </div>

        <div className="mt-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border-2 border-indigo-200 focus:border-indigo-500 outline-none rounded-md p-3"
            rows={3}
            placeholder="Add your comment..."
          />
          <div className="mt-3 text-right">
            <button
              onClick={postComment}
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-md font-medium hover:scale-105 transition-transform"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
