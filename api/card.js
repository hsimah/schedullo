const axios = require('axios');

/**
 * Card prototype
 * This represents a Trello card
 */
function Card({ id, customFieldItems = [] }) {
  this.id = id;
  this.customFields = customFieldItems.reduce(Card.fieldReducer, {});

  this.urls = {
    create: ({ listId }) =>
      `https://api.trello.com/1/cards?idList=${listId}&keepFromSource=all&idCardSource=${this.id}&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    customFields: `https://api.trello.com/1/cards/${id}/customFieldItems?card_customFieldItems=true&key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`
  };
}

/**
 * Copies this Card to a new List
 */
Card.prototype.copy = async function({ listId }) {
  console.log(`copying card: ${this.id}`);
  const url = this.urls.create({ listId });
  await axios.post(url);
};

/**
 * Gets the custom field values for this Card
 */
Card.prototype.getCustomFields = async function() {
  console.log(`getting custom fields: ${this.id}`);
  const { data } = await axios.get(this.urls.customFields);
  this.customFields = data.reduce((a, c) => {
    return {
      ...a,
      day: c.idValue
    };
  }, {});
};

/**
 * Static Card field reducer
 */
Card.fieldReducer = (a, c) => {
  return {
    ...a,
    day: c.idValue
  };
}

module.exports = Card;