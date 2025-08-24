import { Router } from 'express';
import  User  from '../models/User.js';
import { Photo } from '../models/Photo.js';
import { buildPager } from '../utils/pagination.js';
const r = Router();
r.get('/', async (req, res) => {
  const q = (req.query.q || '').trim();
  const { page, limit, skip } = buildPager(req.query);
  if (!q) return res.json({ page, limit, total: 0, items: [] });
  if (q.startsWith('#')) {
    const tag = q.slice(1);
    const [items, total] = await Promise.all([
      Photo.find({ tags: tag }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Photo.countDocuments({ tags: tag })
    ]);
    return res.json({ page, limit, total, items });
  }
  const user = await User.findOne({ username: q });
  if (user) {
    const [items, total] = await Promise.all([
      Photo.find({ owner: user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Photo.countDocuments({ owner: user._id })
    ]);
    return res.json({ page, limit, total, items });
  }
  const [items, total] = await Promise.all([
    Photo.find({ $or: [ { caption: { $regex: q, $options: 'i' } }, { tags: q } ] })
      .sort({ createdAt: -1 }).skip(skip).limit(limit),
    Photo.countDocuments({ $or: [ { caption: { $regex: q, $options: 'i' } }, { tags: q } ] })
  ]);
  res.json({ page, limit, total, items });
});
export default r;
