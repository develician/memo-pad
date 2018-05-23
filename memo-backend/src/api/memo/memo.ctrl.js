const Memo = require('models/Memo');
const { decodeToken } = require('lib/token');
const mongoose = require('mongoose');

exports.checkLogged = async (ctx, next) => {
    const { user } = ctx.request;

    if (!user) {
        ctx.status = 403; // Forbidden
        return;
    }

    return next();

}

exports.create = async (ctx) => {
    const { content, email } = ctx.request.body;

    if (content === "" || content === null || !content) {
        ctx.body = {
            message: "content is required"
        };
        ctx.status = 409;
        return;
    }

    let memo = null;

    try {
        memo = new Memo({
            content,
            email,
            updated: false
        });
        await memo.save();
        ctx.body = memo;
    } catch (e) {
        ctx.throw(500, e);
    }


}

exports.list = async (ctx) => {
    const { user } = ctx.request;
    const { email } = user;


    const { initial, lastId } = ctx.query;
    
    let memos = null;

    try {
        if (initial === "true") {
            memos = await Memo.find({email})
                .sort({ _id: -1 })
                .limit(6)
                .lean()
                .exec();

            ctx.body = {
                memoList: memos
            };
            return;
        }

        if(lastId !== "") {
            let objId = new mongoose.Types.ObjectId(lastId);
            memos = await Memo.find({_id: {$lt: objId}, email})
                            .sort({_id: -1})
                            .limit(6)
                            .lean()
                            .exec();
            ctx.body = {
                memoList: memos
            };
            return;
        }

        

        

    } catch (e) {
        ctx.throw(500, e);
    }
}