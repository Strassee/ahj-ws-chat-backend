class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.created = Date.now();
  }
}

module.exports = { User };