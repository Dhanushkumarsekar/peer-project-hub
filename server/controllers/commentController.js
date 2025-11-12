// const Comment = require('../models/Comment');

// // Get comments for a project
// exports.getCommentsByProject = async (req, res) => {
//   try {
//     const comments = await Comment.find({ projectId: req.params.projectId })
//       .sort({ createdAt: -1 });
//     res.json(comments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create new comment
// exports.createComment = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { projectId } = req.params;

//     const comment = new Comment({
//       projectId,
//       text,
//       authorId: req.user.uid,
//       authorEmail: req.user.email,
//     });

//     const savedComment = await comment.save();
//     res.status(201).json(savedComment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete comment
// exports.deleteComment = async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id);
    
//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     if (comment.authorId !== req.user.uid) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await Comment.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Comment deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const { projectId, text } = req.body;
    if (!projectId || !text) return res.status(400).json({ message: 'projectId and text required' });
    const c = new Comment({
      projectId,
      text,
      user: { uid: req.user.uid, email: req.user.email, name: req.user.name }
    });
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCommentsForProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const comments = await Comment.find({ projectId }).sort({ createdAt: -1 }).lean();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
