const { v4: uuidv4 } = require('uuid');

const { User } = require('./user.js');

class Users {
  constructor() {
    this.users = [];
    this.init();
  }

  init() {
    // this.createUser('Olga');
    // this.createUser('Veronika');
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  createUser(name) {
    const id = uuidv4();
    this.users.push(new User(id, name));
    return { 
      id: id,
      userName: name
    };
  }

  deleteUser(id) {
    const users = this.users.filter((user) => user.id !== id);
    this.users = users;
  }

}

module.exports = { Users };