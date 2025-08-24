import jwt from 'jsonwebtoken';
import { config } from '../config.js';
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  console.log(token);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload; // { id, username }
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
export function signToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, config.jwtSecret, { expiresIn: '7d' });
}
