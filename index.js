const sls = require('serverless-http');
const binaryMimeTypes = require('./server/binaryMimeTypes');
const express = require('express');
const cors = require('cors');
const Logic = require('./server/logic');
const dotenv = require('dotenv');

// load variables
dotenv.config();

// init server logic
const app = express();
const logic = new Logic({ boardId: process.env.BOARD_ID });

logic.startup();

// set cors
app.use(cors({ origin: '*' }));

// server static files
app.use(express.static('client'));

// flush board and recreate cards
app.get('/populate', async function (_, response) {
  await logic.load(); // retrieve board
  await logic.clear(); // clear cards
  await logic.load(); // ensure all boards loaded
  await logic.fill(); // fill lists with cards
  response.status(200).send();
});

// serve trello power up client code
app.get('*', function (_, response) {
  response.sendFile(__dirname + '/client/views/index.html');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(process.env.PORT, () => {
    console.info('Server started');
  });
}

module.exports.server = sls(app, {
  binary: binaryMimeTypes,
});