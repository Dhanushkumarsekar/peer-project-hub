// const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema(
//   {
//     projectId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Project',
//       required: true,
//     },
//     authorId: {
//       type: String,
//       required: true,
//     },
//     authorEmail: {
//       type: String,
//       required: true,
//     },
//     text: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Comment', commentSchema);


const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  text: { type: String, required: true },
  user: {
    uid: String,
    email: String,
    name: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
