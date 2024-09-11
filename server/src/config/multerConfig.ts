// src/config/multerConfig.ts
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const idDoacao = req.params.idDoacao; 
    const timestamp = Date.now();
    const originalName = path.parse(file.originalname).name;
    const extname = path.extname(file.originalname);
    const filename = `${idDoacao}_${timestamp}_${originalName}${extname}`;
    
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

export default upload;

