const express =require('express');
const multer = require('multer');
const path = require('path');
const { promises: fsPromises } = require('fs');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const PORT = 3000;

const storage = multer.diskStorage({
  destination: 'draft',
  filename: (req, file, cb) => {
    const ext = path.parse(file.originalname).ext;
    cb(null, 'file-' + Date.now() + ext);
  }
});

const upload = multer({ storage });

const app = express();

app.use(express.static('static'));

app.post('/form-data', upload.single('file_example'), minifyImage, (req, res, next) => {
  console.log('req.file', req.file);
  console.log('req.body', req.body);

  res.send(req.file);
});

app.listen(PORT);

async function minifyImage(req, res, next) {
  try {
    console.log('start processing...');

    const MINIFIED_DIR = 'static';

    await imagemin([req.file.path], {
      destination: 'images',
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });

    const { filename, path: draftPath } = req.file;

    await fsPromises.unlink(draftPath); // delete file

    req.file = {
      ...req.file,
      path: path.join(MINIFIED_DIR, filename),
      destination: MINIFIED_DIR
    }

    console.log('finished processing!');

    next();
  } catch (err) {
    next(err);
  }
}
