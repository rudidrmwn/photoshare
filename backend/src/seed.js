// seed.js
import mongoose from 'mongoose';
import { Photo } from './models/Photo.js';
import { Comment } from './models/Comment.js';

// Koneksi ke MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/newphotoshare');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Data dummy untuk photos
const generatePhotos = () => {
  const photos = [];
  const tags = ['nature', 'travel', 'food', 'art', 'portrait', 'landscape', 'urban', 'sports'];
  const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  for (let i = 1; i <= 20; i++) {
    const randomTags = [];
    const numTags = Math.floor(Math.random() * 3) + 1; // 1-3 tags
    for (let j = 0; j < numTags; j++) {
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      if (!randomTags.includes(randomTag)) {
        randomTags.push(randomTag);
      }
    }
    
    photos.push({
      owner: new mongoose.Types.ObjectId(), // ID user dummy
      url: `https://picsum.photos/300/300?random=${i}`,
      thumbUrl: `https://picsum.photos/100/100?random=${i}`,
      width: Math.floor(Math.random() * 1000) + 800, // 800-1800px
      height: Math.floor(Math.random() * 1000) + 600, // 600-1600px
      mime: mimeTypes[Math.floor(Math.random() * mimeTypes.length)],
      size: Math.floor(Math.random() * 5000000) + 100000, // 100KB-5MB
      caption: `This is a beautiful photo #${i} with an amazing view`,
      tags: randomTags,
      likes: Math.floor(Math.random() * 100),
      likedBy: Array.from({ length: Math.floor(Math.random() * 10) }, () => 
        new mongoose.Types.ObjectId()
      ),
      commentsCount: 0, // Akan diupdate nanti
    });
  }
  
  return photos;
};

// Data dummy untuk comments
const generateComments = (photoIds) => {
  const comments = [];
  const commentsText = [
    'Great photo!',
    'Amazing capture!',
    'I love this!',
    'Beautiful colors!',
    'Well done!',
    'Impressive shot!',
    'This is stunning!',
    'Wonderful composition!',
    'Perfect timing!',
    'Awesome perspective!',
  ];
  
  photoIds.forEach(photoId => {
    const numComments = Math.floor(Math.random() * 10) + 1; // 1-10 comments per photo
    
    for (let i = 0; i < numComments; i++) {
      comments.push({
        photo: photoId,
        user: new mongoose.Types.ObjectId(), // ID user dummy
        text: commentsText[Math.floor(Math.random() * commentsText.length)],
      });
    }
  });
  
  return comments;
};

// Fungsi utama untuk menjalankan seeder
const seedDB = async () => {
  try {
    // Hapus data lama
    await Photo.deleteMany({});
    await Comment.deleteMany({});
    console.log('Data lama dihapus');
    
    // Hapus indeks teks yang bermasalah sebelum menyimpan data
    try {
      await Photo.collection.dropIndex('caption_text');
      await Photo.collection.dropIndex('tags_text');
      console.log('Indeks teks dihapus');
    } catch (e) {
      console.log('Indeks teks tidak ada atau tidak dapat dihapus, melanjutkan...');
    }
    
    // Generate dan simpan photos
    const photosData = generatePhotos();
    const savedPhotos = await Photo.insertMany(photosData);
    console.log(`${savedPhotos.length} photos berhasil disimpan`);
    
    // Generate dan simpan comments
    const photoIds = savedPhotos.map(photo => photo._id);
    const commentsData = generateComments(photoIds);
    const savedComments = await Comment.insertMany(commentsData);
    console.log(`${savedComments.length} comments berhasil disimpan`);
    
    // Update commentsCount di setiap photo
    for (const photo of savedPhotos) {
      const count = await Comment.countDocuments({ photo: photo._id });
      await Photo.findByIdAndUpdate(photo._id, { commentsCount: count });
    }
    
    // Buat ulang indeks teks setelah data disimpan
    await Photo.createIndexes();
    console.log('Indeks teks dibuat ulang');
    
    console.log('Seeder selesai!');
    process.exit(0);
  } catch (err) {
    console.error('Error dalam seeder:', err);
    process.exit(1);
  }
};

// Jalankan seeder
connectDB().then(() => {
  seedDB();
});