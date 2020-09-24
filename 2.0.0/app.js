const express = require('express');
const { setCookie } = require('./middleware');
const PORT = process.env.PORT;
const app = express();

app.get('/example', setCookie, (req, res) => {
  return res.send({ message: 'Hello Express' });
});

app.listen(PORT, () => console.log(`Server was started on port ${PORT}`));
