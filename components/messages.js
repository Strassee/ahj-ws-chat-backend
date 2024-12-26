const { Message } = require('./message');

class Messages {
  constructor() {
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(new Message(message));
  }
}

module.exports = { Messages };
