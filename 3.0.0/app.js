const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const cors = require('cors');

const {
  validateQueryWeatherParams,
  allowOriginHeader,
  addCorsHeaders
} = require('./middleware');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use(allowOriginHeader); // cors replace it
// app.options('*', addCorsHeaders); // cors replace it
app.use(cors({ origin: 'http://localhost:3000' }));

// In POSTMAN Headers Content-Type: Application/json (mime types)
// multipart/form-data
// text/plain
// x-www-form-url-encoded

app.get('/hello', (req, res) => {
  try {
    console.log('req.body', req.body);
    res.json({ message: 'Hello Express' });
  } catch (err) {
    res.status(400).json({ message: 'Error' });
  }
});

app.get('/weather', validateQueryWeatherParams, async (req, res) => {
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&appid=${process.env.API_WEATHER_SECRET_KEY}`;
    const { data } = await axios.get(url);

    return res.send({ weather: data });
  } catch (err) {
    res.status(404).json({ message: 'Not Found' });
  }
})

app.listen(PORT, () => console.log(`Server was started om port ${PORT}`));
