// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/firebaseAuth');
// const {
//   getAllProjects,
//   getProjectById,
//   createProject,
//   updateProject,
//   deleteProject,
//   toggleFavorite,
// } = require('../controllers/projectController');

// // Public routes
// router.get('/', getAllProjects);
// router.get('/:id', getProjectById);

// // Protected routes
// router.post('/', verifyToken, createProject);
// router.put('/:id', verifyToken, updateProject);
// router.delete('/:id', verifyToken, deleteProject);
// router.post('/:id/favorite', verifyToken, toggleFavorite);

// module.exports = router;


const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getFeed);
router.post('/', projectController.createProject);
router.get('/:id', projectController.getProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);
router.post('/:id/favorite', projectController.toggleFavorite);

module.exports = router;
