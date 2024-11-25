import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'do442sskv',
  api_key: '425775262688875',
  api_secret: 'C7V2C4BuUxUY9y5PuJo3CH8auwo'
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Pet4Home',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

// Create multer upload middleware
const upload = multer({ storage: storage });

export { cloudinary, upload };
