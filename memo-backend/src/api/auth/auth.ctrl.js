const Account = require('models/Account');
const Joi = require('joi');

exports.register = async (ctx) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/),
        passwordCheck: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/)
    });

    if(ctx.request.body.password !== ctx.request.body.passwordCheck) {
        ctx.body = "two passwords are incorrect";
        ctx.status = 400;
        return;
    }

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
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