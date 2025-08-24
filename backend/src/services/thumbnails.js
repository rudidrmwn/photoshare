import sharp from 'sharp';
import path from 'path';
import { config } from '../config.js';
export async function makeThumbnail(absSrc, baseName) {
  const thumbPath = path.join(config.thumbDir, `thumb_${baseName}.jpg`);
  const img = sharp(absSrc);
  const meta = await img.metadata();
  await img.resize(512, 512, { fit: 'inside' }).jpeg({ quality: 82 }).toFile(thumbPath);
  return { thumbPath, width: meta.width, height: meta.height, mime: meta.format };
}
