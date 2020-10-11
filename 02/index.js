const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded()); // Content type url encoded
app.use(express.static('public'));

app.get('/', (req, res, next) => {

  res.set('setCookie', 'asdf=asdf');

  const err = new Error('Throw error');
  err.status = 400

  next(err);
}, (req, res, next) => {
  res.send('Hello.');
});

app.post('/example', (req, res, next) => {
  console.log(req.body);

  res.send(req.body);
});

app.post('/sign-in', (req, res, next) => {
  console.log(req.body);

  res.send('request was successfully handled.');
});

app.use((err, res, req, next) => {
  console.log(err);

  next(err)
});

app.listen(process.env.PORT, () => console.log('Server was started.'));
