// import React from 'react';
// import { auth } from '../firebase';

// const CommentList = ({ comments, onDelete }) => {
//   const currentUser = auth.currentUser;

//   if (!comments || comments.length === 0) {
//     return <p className="text-gray-500 text-center py-4">No comments yet.</p>;
//   }

//   return (
//     <div className="space-y-4">
//       {comments.map((comment) => (
//         <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
//           <div className="flex justify-between items-start mb-2">
//             <span className="text-sm font-medium text-gray-700">
//               {comment.authorEmail}
//             </span>
//             {comment.authorId === currentUser?.uid && (
//               <button
//                 onClick={() => onDelete(comment._id)}
//                 className="text-red-500 text-sm hover:text-red-700"
//               >
//                 Delete
//               </button>
//             )}
//           </div>
//           <p className="text-gray-800">{comment.text}</p>
//           <span className="text-xs text-gray-500">
//             {new Date(comment.createdAt).toLocaleString()}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CommentList;



import React from 'react';

export default function CommentList({ comments = [] }) {
  if (!comments.length) return <div className="text-sm text-gray-500 mt-2">No comments yet</div>;
  return (
    <div className="space-y-3 mt-3">
      {comments.map(c => (
        <div key={c._id} className="p-3 border rounded bg-white">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">{c.user?.name || c.user?.email}</div>
            <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
          </div>
          <div className="mt-2 text-gray-700">{c.text}</div>
        </div>
      ))}
    </div>
  );
}
