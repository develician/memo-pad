const Memo = require('models/Memo');

exports.create = async (ctx) => {
    const { content, email } = ctx.request.body;

    try {

    } catch(e) {
        ctx.throw(500, e);
    }
}