import { Router } from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import mime from 'mime-types';
import { requireAuth } from '../auth/auth.middleware.js';
import { Photo } from '../models/Photo.js';
import { saveFileLocal, publicUrlLocal } from '../services/storage.local.js';
import { makeThumbnail } from '../services/thumbnails.js';
import { config } from '../config.js';
const r = Router();
const upload = multer({
  dest: 'tmp/',
  limits: { fileSize: config.maxUploadBytes },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png'];
    if (!allowed.includes(file.mimetype)) return cb(new Error('Only JPG/PNG allowed'));
    cb(null, true);
  }
});
r.post('/upload', requireAuth, upload.single('photo'), async (req, res) => {
  try {
    const { caption = '', tags = '' } = req.body;
    const ext = mime.extension(req.file.mimetype) || 'jpg';
    const base = `${uuid()}.${ext}`;
    const abs = await saveFileLocal(req.file.path, base);
    const { thumbPath, width, height, mime: format } = await makeThumbnail(abs, base);
    const photo = await Photo.create({
      owner: req.user.id,
      url: publicUrlLocal(abs),
      thumbUrl: publicUrlLocal(thumbPath),
      width, height,
      mime: format,
      size: req.file.size,
      caption,
      tags: tags.split(',').map(s => s.trim()).filter(Boolean)
    });
    req.io.emit('photo:new', { id: photo._id, thumbUrl: photo.thumbUrl });
    res.status(201).json(photo);
  } catch (e) {
    res.status(400).json({ error: e.message || 'Upload failed' });
  }
});
r.post('/:id/like', requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updated = await Photo.findOneAndUpdate(
    { _id: id, likedBy: { $ne: userId } },
    { $inc: { likes: 1 }, $push: { likedBy: userId } },
    { new: true }
  );
  if (!updated) return res.status(409).json({ error: 'Already liked or photo missing' });
  req.io.to(`photo:${id}`).emit('photo:like', { id, likes: updated.likes });
  res.json({ likes: updated.likes });
});
r.post('/:id/unlike', requireAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updated = await Photo.findOneAndUpdate(
    { _id: id, likedBy: userId },
    { $inc: { likes: -1 }, $pull: { likedBy: userId } },
    { new: true }
  );
  if (!updated) return res.status(409).json({ error: 'Not liked or photo missing' });
  req.io.to(`photo:${id}`).emit('photo:like', { id, likes: updated.likes });
  res.json({ likes: updated.likes });
});
export default r;