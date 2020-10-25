const express = require('express');
const multer = require('multer');
const path = require('path');

// const upload = multer({ dest: 'static' });
const storage = multer.diskStorage({
    destination: 'static',
    filename: function (req, file, cb) {
        const ext = path.parse(file.originalname).ext;
        cb(null, file.fieldname + ext)
    }
});

const upload = multer({ storage });

const PORT = 3000;

const app = express();

app.use(express.static('static'));

app.post('/form-data', upload.single('file_example'), (req, res, next) => {
    console.log('req.file', req.file);
    console.log('req.body', req.body);

    res.send('ok');
});

app.listen(PORT, () => console.log('Server was started'))