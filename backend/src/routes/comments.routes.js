import { Router } from 'express';
import { requireAuth } from '../auth/auth.middleware.js';
import { Comment } from '../models/Comment.js';
import { Photo } from '../models/Photo.js';
import { buildPager } from '../utils/pagination.js';
const r = Router({ mergeParams: true });
r.get('/', async (req, res) => {
  const { page, limit, skip } = buildPager(req.query);
  const photoId = req.params.id;
  const [items, total] = await Promise.all([
    Comment.find({ photo: photoId }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user', 'username'),
    Comment.countDocuments({ photo: photoId })
  ]);
  res.json({ page, limit, total, items });
});
r.post('/', requireAuth, async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'Text required' });
  const photo = await Photo.findById(req.params.id);
  if (!photo) return res.status(404).json({ error: 'Photo not found' });
  const c = await Comment.create({ photo: photo._id, user: req.user.id, text: text.trim() });
  await Photo.updateOne({ _id: photo._id }, { $inc: { commentsCount: 1 } });
  const populated = await c.populate('user', 'username');
  req.io.to(`photo:${photo._id}`).emit('comment:new', { id: c._id, text: c.text, user: populated.user, createdAt: c.createdAt });
  res.status(201).json(populated);
});
r.delete('/:commentId', requireAuth, async (req, res) => {
  const { id, commentId } = req.params;
  const c = await Comment.findOne({ _id: commentId, user: req.user.id, photo: id });
  if (!c) return res.status(404).json({ error: 'Comment not found' });
  await c.deleteOne();
  await Photo.updateOne({ _id: id }, { $inc: { commentsCount: -1 } });
  req.io.to(`photo:${id}`).emit('comment:delete', { id: commentId });
  res.json({ ok: true });
});
export default r;
