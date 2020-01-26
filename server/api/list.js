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
}

List.prototype.urls = function () {
  return {
    create: `https://api.trello.com/1/lists?name=${this.name}&pos=${this.pos}&idBoard=${process.env.BOARD_ID}&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    clear: `https://api.trello.com/1/lists/${this.id}/archiveAllCards?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    cards: `https://api.trello.com/1/lists/${this.id}/cards?customFieldItems=true&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    update: `https://api.trello.com/1/lists/${this.id}?pos=${this.pos}&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
  };
};

/**
 * Creates the List
 */
List.prototype.create = async function () {
  console.log(`creating list: ${this.name}`);
  const { create } = this.urls();
  const { data } = await axios.post(create);
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
  const { clear } = this.urls();
  await axios.post(clear);
  this.cards = [];
  return this;
};

/**
 * Gets all cards for the List
 */
List.prototype.getCards = async function () {
  console.log(`retrieving cards: ${this.name}`);
  const { cards } = this.urls();
  try {
    const { data } = await axios.get(cards);
    this.cards = data.map((c) => new Card(c));

  } catch (e) {
    console.error(e);
    this.cards = [];
  }
  return this;
};

List.prototype.update = async function (pos) {
  this.pos = pos;
  const { update } = this.urls();
  await axios.put(update);
  return this;
};

module.exports = List;
