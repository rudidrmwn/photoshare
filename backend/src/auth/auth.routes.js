import { Router } from 'express';
import  User from '../models/User.js';
import { signToken } from './auth.middleware.js';
const r = Router();
r.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(409).json({ error: 'Username or email already taken' });
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    res.status(201).json({ token, user: { id: user._id, username: user.username } });
  } catch (e) { res.status(500).json({ error: 'Server error' }); }
});
r.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken(user);
  res.json({ token, user: { id: user._id, username: user.username } });
});
r.post('/password/reset', async (req, res) => {
  res.json({ ok: true });
});
export default r;
