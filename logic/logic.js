const listData = require('../data/lists.json');
const Board = require('../api/board');
const List = require('../api/list');

/**
 * Server business logic prototype
 */
function Logic({ boardId }) {
  this.cache = Logic.buildCache({ boardId });
}

Logic.buildCache = function ({ boardId }) {
  return {
    board: new Board({ id: boardId }),
    lists: listData.reduce((a, c) => ({
      ...a,
      [c.name]: new List(c)
    }), {}),
    master: null,
  };
}

/**
 * Boots the server, fetches necessary data
 */
Logic.prototype.startup = async function () {
  await this.load().then(this.populate.bind(this))
}

/**
 * Clears cards from all lists
 */
Logic.prototype.clear = async function () {
  for (let day in this.cache.lists) {
    const list = this.cache.lists[day];
    (list.id != null ? list.clear() : list.create())
      .then(l => {
        this.cache.lists[day] = l;
      });
  }
}

/**
 * Populates board with lists
 */
Logic.prototype.populate = async function () {
  for (let day in this.cache.lists) {
    const list = this.cache.lists[day];
    if (list.id == null) {
      await list.create();
    }
  }
}

/**
 * Fills board lists with Master cards
 */
Logic.prototype.fill = async function () {
  const { options } = this.cache.board.data.customfields.Day;
  const cardsByList = this.cache.master.cards.reduce((a, c) => {
    const day = options[c.customFields.day];
    const existingCards = a[day] || [];
    existingCards.push(c);
    return {
      ...a,
      [day]: existingCards
    };
  }, {});
  Object.values(this.cache.lists).forEach(async l => {
    const cards = cardsByList[l.name];
    if (cards != null) {
      cards.forEach(async c => {
        await c.copy({ cardId: c.id, listId: l.id });
      });
    }
  });
}

/**
 * Loads remote data into cache
 */
Logic.prototype.load = async function () {
  this.cache = Logic.buildCache({ boardId: this.cache.board.id });
  return Promise.all([
    this.cache.board.get(),
    List.get({ boardId: this.cache.board.id })
  ]).then(async ([_, lists]) => {
    await this.cache.board.getFields();

    for (let list of lists) {
      if (list.name === "Master") {
        delete this.cache.lists.Master;
        this.cache.master = new List(list);
        await this.cache.master.getCards();
        continue;
      }

      if (this.cache.lists[list.name] != null) {
        this.cache.lists[list.name] = new List(list);
      }
    }
  });
}

module.exports = Logic;