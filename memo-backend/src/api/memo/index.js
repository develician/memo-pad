const Router = require('koa-router');
const memoCtrl = require('./memo.ctrl');

const memos = new Router();

memos.post('/', memoCtrl.checkLogged, memoCtrl.create);
memos.get('/', memoCtrl.checkLogged, memoCtrl.list);

module.exports = memos;