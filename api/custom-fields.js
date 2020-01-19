const axios = require('axios');
const fields = require('../data/fields.json');

const optionReducer = (a, c) => {
  return {
    ...a,
    [c.id]: c.value.text
  };
};

/**
 * CustomField prototype
 * This represents Trello custom fields
 */
function CustomField({ boardId }) {
  this.boardId = boardId;
  this.urls = {
    get: `https://api.trello.com/1/boards/${process.env.BOARD_ID}/customFields?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
    create: `https://api.trello.com/1/customFields?key=${process.env.API_KEY}&token=${process.env.API_TOKEN}`,
  }
}

/**
 * Gets custom fields for a board
 */
CustomField.prototype.get = async function () {
  const { data } = await axios(get);
  this.data = data.reduce(reducer, {});
  return data;
}

/**
 * Creates custom fields for a board
 */
CustomField.prototype.create = async function () {
  fields.forEach(async field => {
    const payload = Object.assign({ idModel: this.boardId }, field);
    await axios
      .post(post, payload)
  })
}

/**
 * CustomField reducder
 */
CustomField.reducer = (a, c) => {
  if (c.name === "Day") {
    a[c.name] = {
      id: c.id,
      options: c.options.reduce(optionReducer, {})
    };
  }

  return a;
}

module.exports = CustomField;