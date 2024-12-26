const combineRouters = require('koa-combine-routers');

const { createuser } = require('./createuser');

const router = combineRouters(
  createuser,
);

module.exports = router;