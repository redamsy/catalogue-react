const express = require('express');
const bodyParser = require('body-parser');
// const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(pino);

app.set('port', (process.env.PORT || 8081));

app.get('/server/greeting', (req, res) => {
  try {
    console.log("app.js: req", req);
    console.log("app.js: req.query", req.query);
    console.log("app.js: req.query.name", req.query.name);
    const name = req.query.name || 'catalogue World';
    res.setHeader('Content-Type', 'application/json');
    // res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
    res.send({ greeting: `Hello ${name}!` });
  } catch (error) {
    var errMessage = `${error}`;
    processErrorResponse(res, 500, errMessage);    
  }
});

function processErrorResponse(res, statusCode, message) {
	console.log(`${statusCode} ${message}`);
	res.status(statusCode).send({
		error: {
			status: statusCode,
			message: message
		},
	});
}

app.listen(app.get('port'), () =>
  console.log('Express server is running on', app.get('port'))
);

module.exports = app;