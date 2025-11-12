// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/firebaseAuth');
// const {
//   getCommentsByProject,
//   createComment,
//   deleteComment,
// } = require('../controllers/commentController');

// // Public routes
// router.get('/project/:projectId', getCommentsByProject);

// // Protected routes
// router.post('/project/:projectId', verifyToken, createComment);
// router.delete('/:id', verifyToken, deleteComment);

// module.exports = router;


const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/project/:projectId', commentController.getCommentsForProject);

module.exports = router;
