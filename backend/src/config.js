import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/newphotoshare',
  jwtSecret: process.env.JWT_SECRET || 'R@h@si@K3y123',
  storageMode: process.env.STORAGE_MODE || 'local',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  thumbDir: process.env.THUMB_DIR || './thumbs',
  maxUploadBytes: (Number(process.env.MAX_UPLOAD_MB || 10)) * 1024 * 1024,
  s3: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET,
  }
};
