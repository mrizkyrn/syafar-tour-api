import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the uploads directory exists
const uploadDir = 'public/upload';
if (!fs.existsSync(uploadDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Get the subfolder based on the field name
const getSubfolder = (fieldName: string): string => {
  switch (fieldName) {
    case 'thumbnails':
      return path.join(uploadDir, 'thumbnail');
    default:
      return path.join(uploadDir, 'others');
  }
};

// Ensure the subfolders exist
const subfolders = ['thumbnail', 'others'];
subfolders.forEach((folder) => {
  const dir = path.join(uploadDir, folder);
  if (!fs.existsSync(dir)) {
    console.log(`Creating ${dir} directory...`);
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Set up storage with a dynamic folder based on request or content type
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = getSubfolder(file.fieldname);
    cb(null, folderName);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const sanitizedFilename = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    cb(null, `${sanitizedFilename}-${uniqueSuffix}${ext}`);
  },
});

// Set file filter to restrict file types (e.g., images only)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format. Only JPEG, PNG, and JPG are allowed'), false);
  }
};

// Set file size limits
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

// Initialize multer upload
export const upload = multer({
  storage,
  fileFilter,
  limits,
});
