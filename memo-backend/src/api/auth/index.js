const Router = require('koa-router');

const authCtrl = require('./auth.ctrl');

const auths = new Router();

module.exports = auths;