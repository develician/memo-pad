const Router = require('koa-router');

const authCtrl = require('./auth.ctrl');

const auths = new Router();

auths.post('/register', authCtrl.register);
auths.post('/login', authCtrl.login);
auths.get('/check', authCtrl.check);
auths.post('/logout', authCtrl.logout);

module.exports = auths;