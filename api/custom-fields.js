const axios = require('axios');
const fields = require('../data/fields.json');

const optionReducer = (a, c) => {
  return {
    ...a,
    [c.id]: c.value.text,
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
  };
}

/**
 * Gets custom fields for a board
 */
CustomField.prototype.get = async function () {
  const { data } = await axios(this.urls.get);
  this.data = data.reduce(CustomField.reducer, {});
  return data;
};

/**
 * Creates custom fields for a board
 */
CustomField.prototype.create = async function () {
  fields.forEach(async (field) => {
    const payload = Object.assign({ idModel: this.boardId }, field);
    await axios
      .post(this.urls.create, payload);
  });
};

/**
 * Static CustomField reducder
 * @param {object} a the reducer accumulator
 * @param {object} c the current CustomField
 * @returns {object} map of custom fields by type
 */
CustomField.reducer = (a, c) => {
  switch(c.name) {
    case 'Day':
      a[c.name] = {
        id: c.id,
        options: c.options.reduce(optionReducer, {}),
      };
      break;
  }

  return a;
};

module.exports = CustomField;