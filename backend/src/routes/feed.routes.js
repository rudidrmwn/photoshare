import { Router } from 'express';
import { Photo } from '../models/Photo.js';
import { buildPager } from '../utils/pagination.js';
const r = Router();
r.get('/latest', async (req, res) => {
  const { page, limit, skip } = buildPager(req.query);
  const [items, total] = await Promise.all([
    Photo.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Photo.countDocuments({})
  ]);
  res.json({ page, limit, total, items });
});
r.get('/popular', async (req, res) => {
  const { page, limit, skip } = buildPager(req.query);
  const [items, total] = await Promise.all([
    Photo.find({}).sort({ likes: -1, createdAt: -1 }).skip(skip).limit(limit),
    Photo.countDocuments({})
  ]);
  res.json({ page, limit, total, items });
});
export default r;
