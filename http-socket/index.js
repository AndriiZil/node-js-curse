const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// в реальном приложении сообщения хранились бы в базе данных или, в некоторых случаях, в JSON-файлах,
// а не в переменной, которая обнуляется при остановке сервера
let messages = [];

// создаем новое сообщение
app.post('/messages', (req, res) => {
  messages.push(req.body.text);
  res.json({
    success: true
  });
});

// получаем все сообщения
app.get('/messages', (req, res) => {
  res.json({
    messages
  });
});

// слушаем все запросы на localhost: 8080.
app.listen(8080, () => console.log('Слушаю порт 8080'));
