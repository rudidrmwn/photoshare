import { Router } from 'express';
import { Photo } from '../models/Photo.js';
const r = Router();
r.get('/hashtags', async (_req, res) => {
  const since = new Date(Date.now() - 24*60*60*1000);
  const agg = await Photo.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
    { $project: { tag: '$_id', count: 1, _id: 0 } }
  ]);
  res.json(agg);
});
r.get('/tag/:tag', async (req, res) => {
  const tag = req.params.tag;
  const page = Number(req.query.page||1); const limit = 20; const skip = (page-1)*limit;
  const [items, total] = await Promise.all([
    Photo.find({ tags: tag }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Photo.countDocuments({ tags: tag })
  ]);
  res.json({ page, limit, total, items });
});
export default r;
