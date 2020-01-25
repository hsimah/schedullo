const listData = require('./data/lists.json');
const Board = require('./api/board');
const List = require('./api/list');

/**
 * Server business logic prototype
 */
function Logic({ boardId }) {
  this.boardId = boardId;
  this._init();
}

Logic.prototype._init = function () {
  this.board = new Board({ id: this.boardId });
  this.lists = listData.reduce((a, c) => ({
    ...a,
    [c.name]: new List(c),
  }), {});
  this.master = null;
};

/**
 * Boots the server, fetches necessary data
 */
Logic.prototype.startup = async function () {
  await this.load();
  await this.populate();
};

/**
 * Clears cards from all lists
 */
Logic.prototype.clear = async function () {
  for (let day in this.lists) {
    const list = this.lists[day];
    this.lists[day] = await (list.id != null ? list.clear() : list.create());
  }
};

/**
 * Populates board with lists
 */
Logic.prototype.populate = async function () {
  for (let day in this.lists) {
    const list = this.lists[day];
    if (list.id == null) {
      this.lists[day] = await list.create();
    }
  }
};

/**
 * Fills board lists with Master cards
 */
Logic.prototype.fill = async function () {
  const { options } = this.board.data.customfields.Day;
  await this.master.cards.map(async (c) => {
    const day = options[c.customFields.day];
    const list = this.lists[day];
    if (list.id != null) {
      await c.copy({ cardId: c.id, listId: list.id });
    }
  });
};

/**
 * Loads remote data into cache
 */
Logic.prototype.load = async function () {
  // sync object with trello
  this._init();

  // fetch board, fields and lists
  await this.board.get();
  await this.board.getFields();
  await this.board.getLists();

  // map master list and day lists
  for (let list of this.board.data.lists) {
    switch (list.name) {
      case 'Master':
        delete this.lists.Master;
        this.master = new List(list);
        await this.master.getCards();
        break;
      default:
        if (this.lists[list.name] != null) {
          this.lists[list.name] = new List(list);
        }
    }
  }
};

module.exports = Logic;