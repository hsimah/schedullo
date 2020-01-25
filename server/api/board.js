const axios = require('axios');
const CustomFields = require('./custom-fields');
const List = require('./list');
/**
 * Board prototype
 * This represents a Trello board
 */
function Board({ id }) {
  this.id = id;
  this.data = {};
  this.urls = {
    get: `https://api.trello.com/1/boards/${this.id}?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    fields: `https://api.trello.com/1/boards/${this.id}/customFields?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    lists: `https://api.trello.com/1/boards/${this.id}/lists?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
  };
}

/**
 * Gets the Board
 */
Board.prototype.get = async function() {
  console.info(`getting board: ${this.id}`);
  const { data } = await axios.get(this.urls.get);
  this.data = data;
};

/**
 * Gets custom fields for the Board
 */
Board.prototype.getFields = async function() {
  console.info(`getting fields for: ${this.id}`);
  const { data } = await axios.get(this.urls.fields);
  this.data.customfields = data.reduce(CustomFields.reducer, {});
};

/**
* Gets all Lists for a given boardId
*/
Board.prototype.getLists = async function() {
  console.log(`getting lists: ${this.id}`);
  const { data } = await axios.get(this.urls.lists);
  this.data.lists = data.map((l) => new List(l));
};

module.exports = Board;
