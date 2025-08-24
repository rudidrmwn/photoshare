import mongoose from 'mongoose';
const PhotoSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  url: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  width: Number,
  height: Number,
  mime: String,
  size: Number,
  caption: String,
  tags: { type: [String], index: true },
  likes: { type: Number, default: 0, index: true },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', index: true },
  commentsCount: { type: Number, default: 0 },
}, { timestamps: true });

PhotoSchema.index({ caption: 'text' });
PhotoSchema.index({ tags: 'text' });

export const Photo = mongoose.model('Photo', PhotoSchema);

