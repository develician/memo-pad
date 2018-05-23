const Router = require('koa-router');

const api = new Router();

const memo = require('./memo');
const auth = require('./auth');

api.use('/memo', memo.routes());
api.use('/auth', auth.routes());

module.exports = api;

