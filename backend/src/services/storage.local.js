import fs from 'fs';
import path from 'path';
import { config } from '../config.js';
function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }
ensureDir(config.uploadDir);
ensureDir(config.thumbDir);
export async function saveFileLocal(tempPath, filename) {
  const dest = path.join(config.uploadDir, filename);
  await fs.promises.rename(tempPath, dest);
  return dest;
}
export function publicUrlLocal(absPath) {
  return `/static/${path.basename(absPath)}`;
}
