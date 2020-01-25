const Card = require('./card');
const axios = require('axios');

/**
 * List prototype
 * This represents a Trello list
 */
function List({ id, name, pos }) {
  this.name = name;
  this.pos = pos;
  this.id = id;

  this.urls = {
    create: `https://api.trello.com/1/lists?name=${name}&pos=${pos}&idBoard=${process.env.BOARD_ID}&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    clear: `https://api.trello.com/1/lists/${id}/archiveAllCards?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    cards: `https://api.trello.com/1/lists/${id}/cards?customFieldItems=true&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
  };
}

/**
 * Creates the List
 */
List.prototype.create = async function () {
  console.log(`creating list: ${this.name}`);
  const { data } = await axios.post(this.urls.create);
  this.id = data.id;
  this.name = data.name;
  this.pos = data.pos;
  this.cards = [];
  return this;
};

/**
 * Archives all cards for the List
 */
List.prototype.clear = async function () {
  console.log(`clearing list: ${this.name}`);
  await axios.post(this.urls.clear).then(() => this.cards = []);
  return this;
};

/**
 * Gets all cards for the List
 */
List.prototype.getCards = async function () {
  console.log(`retrieving cards: ${this.name}`);
  const { data } = await axios.get(this.urls.cards);
  this.cards = data.map((c) => new Card(c));
};

module.exports = List;
