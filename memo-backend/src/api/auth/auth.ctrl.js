const Account = require('models/Account');
const Joi = require('joi');

exports.register = async (ctx) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/),
        passwordCheck: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/)
    });

    if(ctx.request.body.password !== ctx.request.body.passwordCheck) {
        ctx.body = {
            message: "two passwords are incorrect"
        };
        ctx.status = 400;
        return;
    }

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        ctx.body = {
            message: result.error.details[0].message
        };
        return;
    }

    const { email, password } = ctx.request.body;

    let exisitng = null;

    try {
        exisitng = await Account.findByEmail(email);
    } catch(e) {
        ctx.throw(500, e);
    }

    if(exisitng) {
        ctx.status = 409;
        ctx.body = {
            message: "email already exists"
        };
        return;
    }

    let account = null;

    try {
        account = await Account.register({
            email,
            password
        });
    } catch(e) {
        ctx.throw(500, e);
    }

    account.password = null;

    ctx.body = account;
    
}

exports.login = async (ctx) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/)
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        ctx.body = {
            message: result.error.details[0].message
        };
        return;
    }

    const { email, password } = ctx.request.body;

    let account = null;

    try {
        account = await Account.findByEmail(email);
    } catch(e) {
        ctx.throw(500, e);
    }

    if(!account) {
       
        ctx.body = {
            message: "email not exists"
        };
        ctx.status = 409;
        return;
    }

    if(!account.validatePassword(password)) {
        ctx.body = {
            message: "password is incorrect"
        };
        ctx.status = 409;
        return;
    }

    let token = null;

    try {
        token = await account.generateToken();
    } catch(e) {
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    ctx.body = {
        email: account.email
    };

}

exports.check = async (ctx) => {
    const {user} = ctx.request;
    if(!user) {
        ctx.status = 403;
        return;
    }

    ctx.body = user;
}

exports.logout = async (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0, 
        httpOnly: true
    });
    ctx.status = 204;
}