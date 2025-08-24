// seed-users.js
import mongoose from 'mongoose';
import User from './models/User.js';

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

// Data dummy untuk users
const generateUsers = () => {
  return [
    {
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: '$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG'
    },
    {
      username: 'janedoe',
      email: 'jane.doe@example.com',
      password: '$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG'
    },
    {
      username: 'alice',
      email: 'alice.smith@example.com',
      password: '$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG'
    },
    {
      username: 'bob',
      email: 'bob.johnson@example.com',
      password: '$2a$12$$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG/3ElUG'
    },
    {
      username: 'emma',
      email: 'emma.wilson@example.com',
      password: '$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG'
    },
    {
      username: 'michael',
      email: 'michael.brown@example.com',
      password: '$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG'
    },
    {
      username: 'sarah',
      email: 'sarah.davis@example.com',
      password: '$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG'
    },
    {
      username: 'david',
      email: 'david.miller@example.com',
      password: 'da$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUGvid987'
    },
    {
      username: 'lisa',
      email: 'lisa.anderson@example.com',
      password: '$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG'
    },
    {
      username: 'kevin',
      email: 'kevin.martinez@example.com',
      password: '$2a$12$F0UE9EKH0vgypn795AN6QexHwfJmMM05afOcs8AsZuPXBuX/3ElUG'
    }
  ];
};

// Fungsi utama untuk menjalankan seeder users
const seedUsers = async () => {
  try {
    // Hapus data lama
    await User.deleteMany({});
    console.log('Data users lama dihapus');
    
    // Generate dan simpan users
    const usersData = generateUsers();
    const savedUsers = await User.insertMany(usersData);
    console.log(`${savedUsers.length} users berhasil disimpan`);
    
    // Tampilkan info users yang dibuat
    console.log('\nUsers yang berhasil dibuat:');
    savedUsers.forEach(user => {
      console.log(`- ${user.username} (${user.email})`);
    });
    
    console.log('\nSeeder users selesai!');
    process.exit(0);
  } catch (err) {
    console.error('Error dalam seeder users:', err);
    process.exit(1);
  }
};

// Jalankan seeder
connectDB().then(() => {
  seedUsers();
});