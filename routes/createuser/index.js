const { Users } = require('../../components/users');

const Router = require('koa-router');

const createuser = new Router();

const users = new Users();

createuser.post('/createuser', async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');

  if(users.users.find(user => user.name === ctx.request.body.nickname) === undefined) {
    ctx.response.status = 200;
    ctx.response.body = users.createUser(ctx.request.body.nickname);
  } else {
    ctx.response.status = 401;
    ctx.response.body = {error : 'User already exist'}
  };
 

});

module.exports = { createuser, users };
