const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.set('port', (process.env.PORT || 8081));

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'catalogue World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(app.get('port'), () =>
  console.log('Express server is running on', app.get('port'))
);

module.exports = app;