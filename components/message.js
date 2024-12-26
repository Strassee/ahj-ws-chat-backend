class Message {
  constructor(message) {
    this.userId = message.userId;
    this.userName = message.userName;
    this.messageContent = message.message;
    this.created = Date.now();
  }
}

module.exports = { Message };