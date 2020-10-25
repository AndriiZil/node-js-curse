const express =require('express');
const multer = require('multer');
const path = require('path');

const PORT = 3000;

const storage = multer.diskStorage({
  destination: 'static',
  filename: (req, file, cb) => {
    const ext = path.parse(file.originalname).ext;
    cb(null, 'file-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

const app = express();

app.use(express.static('static'));

app.post('/form-data', upload.single('file_example'), (req, res, next) => {
  console.log('req.file', req.file);
  console.log('req.body', req.body);

  res.send('Ok');
});

app.listen(PORT);
