const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const WS = require('ws');
const { Messages } = require('./components/messages');
const { users } = require('./routes/createuser/index');

const router = require('./routes');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use((ctx, next) => {
  if (ctx.request.method !== 'OPTIONS') {
    next();

    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');

  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');

  ctx.response.status = 204;
});

app.use(router());

const server = http.createServer(app.callback());

const port = process.env.PORT || 7070;

const wsServer = new WS.Server({
  server
});

const messages = new Messages();

wsServer.on('connection', (ws) => { 
  ws.on('message', (mess) => {
    const message = JSON.parse(String(mess));
    let eventData = '';
    if(message.type === 'message') {
      messages.addMessage(message);
      // const eventData = {'messages': [messages.messages[messages.messages.length - 1]]};
      eventData = JSON.stringify({messages: [messages.messages[messages.messages.length - 1]], type: 'addMessage'});
    }
    if(message.type === 'newUser') {
      eventData = JSON.stringify({users: [users.users.find(user => user.id === message.userId)], type: 'addUser'});
    }
    if(message.type === 'delUser') {
      users.deleteUser(message.userId);
      // eventData = JSON.stringify({users: users.users, type: 'delUser'});
      eventData = JSON.stringify({users: message.userId, type: 'delUser'});
    }
    Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => client.send(eventData));
      return;
  });
  ws.send(JSON.stringify({messages: messages.messages, users: users.users, type: 'addList'}));
});

wsServer.on('close', () => {
  eventData = JSON.stringify({users: users.users});
  Array.from(wsServer.clients)
  .filter(client => client.readyState === WS.OPEN)
  .forEach(client => client.send(eventData));
  return;
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Server is listening to ' + port);
});
