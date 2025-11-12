// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     techStack: {
//       type: [String],
//       default: [],
//     },
//     githubUrl: {
//       type: String,
//       trim: true,
//     },
//     liveUrl: {
//       type: String,
//       trim: true,
//     },
//     authorId: {
//       type: String,
//       required: true,
//     },
//     authorEmail: {
//       type: String,
//       required: true,
//     },
//     favorites: {
//       type: [String],
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Project', projectSchema);


const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] },
  githubLink: { type: String, default: '' },
  liveLink: { type: String, default: '' },
  createdBy: {
    uid: String,
    email: String,
    name: String
  },
  favorites: [{ uid: String }],
  rating: {
    avg: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
