const { Users } = require('../../components/users');

const Router = require('koa-router');

const createuser = new Router();

const users = new Users();

createuser.post('/createuser', async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');
  // console.log(members.members.find(member => member.name === ctx.request.body.nickname));
  // members.members.map(member => console.log(member.name, ctx.request.body.nickname, member.name === ctx.request.body.nickname))
  
  if(users.users.find(user => user.name === ctx.request.body.nickname) === undefined) {
    ctx.response.status = 200;
    // const a = members.createMember(ctx.request.body.nickname);
    // console.log(a);
    ctx.response.body = users.createUser(ctx.request.body.nickname);
  } else {
    ctx.response.status = 401;
    ctx.response.body = {error : 'User already exist'}
  };
 

});

// module.exports = { users };
module.exports = { createuser, users };
