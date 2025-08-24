import mongoose from 'mongoose';
const CommentSchema = new mongoose.Schema({
  photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo', index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
}, { timestamps: true });
export const Comment = mongoose.model('Comment', CommentSchema);
