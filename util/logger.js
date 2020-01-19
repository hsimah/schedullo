function Logger({ type, id }) {
  this.type = type;
  this.id = id;
}

Logger.prototype.info = function (action) {
  console.info(`${this.type} (${this.id}) ${action}`);
}

Logger.prototype.error = function (action) {
  console.error(`${this.type} (${this.id}) ${action}`);
}

Logger.prototype.log = function (action) {
  console.log(`${this.type} (${this.id}) ${action}`);
}

module.exports = Logger;