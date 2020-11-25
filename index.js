const { PORT = 3000 } = process.env;
const express = require('express');

const server = express();
const { client } = require('./db');
client.connect();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

server.use(jsonParser);

const morgan = require('morgan');
server.use(morgan('dev'));

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((req, res, next) => {
  console.log('<____Body Logger START____>');
  console.log(req.body);
  console.log('<_____Body Logger END_____>');
  next();
});

server.use('/api', (req, res, next) => {
  console.log('A request was made to /api');
  next();
});

server.get('/api', (req, res, next) => {
  console.log('A get request was made to /api');
  res.send({ message: 'success' });
});

server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${req.params.color};">
      <h1>Hello World</h1>
    </body>
  `);
});

server.get('/add/:first/to/:second', (req, res, next) => {
  res.send(
    `<h1>${req.params.first} + ${req.params.second} = ${
      Number(req.params.first) + Number(req.params.second)
    }</h1>`
  );
});

server.listen(PORT, () => {
  console.log('The server is up on port', PORT);
});
