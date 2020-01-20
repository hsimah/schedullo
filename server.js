const express = require('express');
const cors = require('cors');
const app = express();
const Logic = require('./logic/logic');
const dotenv = require('dotenv');

// load variables
dotenv.config();

// init server logic
const logic = new Logic({ boardId: process.env.BOARD_ID });

logic.startup().then(() => {
  // listen for requests
  const listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
  });
});

// set cors
app.use(cors({ origin: '*' }));

// server static files
app.use(express.static('public'));

// flush board and recreate cards
app.get('/populate', function (_, response) {
  logic.load()
    .then(logic.clear.bind(logic)) // clear cards
    .then(logic.load.bind(logic)) // ensure all boards loaded
    .then(logic.fill.bind(logic)) // fill lists with cards
    .then(() => response.status(200).send());
});

// serve trello power up client code
app.get('*', function (_, response) {
  response.sendFile(__dirname + '/views/index.html');
});