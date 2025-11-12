// const Project = require('../models/Project');

// // Get all projects
// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find().sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single project by ID
// exports.getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create new project
// exports.createProject = async (req, res) => {
//   try {
//     const { title, description, techStack, githubUrl, liveUrl } = req.body;
    
//     const project = new Project({
//       title,
//       description,
//       techStack,
//       githubUrl,
//       liveUrl,
//       authorId: req.user.uid,
//       authorEmail: req.user.email,
//     });

//     const savedProject = await project.save();
//     res.status(201).json(savedProject);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update project
// exports.updateProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
    
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     if (project.authorId !== req.user.uid) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     const updatedProject = await Project.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updatedProject);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete project
// exports.deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
    
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     if (project.authorId !== req.user.uid) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }

//     await Project.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Project deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Toggle favorite
// exports.toggleFavorite = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
    
//     if (!project) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     const userId = req.user.uid;
//     const index = project.favorites.indexOf(userId);

//     if (index > -1) {
//       project.favorites.splice(index, 1);
//     } else {
//       project.favorites.push(userId);
//     }

//     await project.save();
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const { title, description, tags, githubLink, liveLink } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const p = new Project({
      title,
      description: description || '',
      tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t=>t.trim()).filter(Boolean) : []),
      githubLink: githubLink || '',
      liveLink: liveLink || '',
      createdBy: { uid: req.user.uid, email: req.user.email, name: req.user.name }
    });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFeed = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '10')));
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const total = await Project.countDocuments();
    res.json({ projects, total, page, limit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProject = async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    if (p.createdBy.uid !== req.user.uid) return res.status(403).json({ message: 'Forbidden' });
    const updatable = ['title', 'description', 'tags', 'githubLink', 'liveLink'];
    updatable.forEach(key => {
      if (req.body[key] !== undefined) p[key] = req.body[key];
    });
    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProject = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    if (p.createdBy.uid !== req.user.uid) return res.status(403).json({ message: 'Forbidden' });
    await p.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleFavorite = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Not found' });
    const exists = p.favorites.some(f => f.uid === req.user.uid);
    if (exists) {
      p.favorites = p.favorites.filter(f => f.uid !== req.user.uid);
    } else {
      p.favorites.push({ uid: req.user.uid });
    }
    await p.save();
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
