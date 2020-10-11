const express = require('express');
const { setCookie, errorHandler } = require('./middleware');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('Time:', new Date().toISOString());
  next();
});

app.get('/example', setCookie, (req, res) => {
  return res.send({ message: 'Hello Express' });
});

app.post('/example', (req, res) => {
  res.send(req.body);
});

app.get('/users', (req, res, next) => {

  const error = new Error('Error');
  error.status = 400;

  next(error);
  // next()
}, (req, res) => {
  res.send({ message: 'OK' });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server was started on port ${PORT}`));
