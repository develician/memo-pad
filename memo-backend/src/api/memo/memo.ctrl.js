const Memo = require('models/Memo');
const { decodeToken } = require('lib/token');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

exports.checkLogged = async (ctx, next) => {
    const { user } = ctx.request;


    if (!user) {
        ctx.status = 403; // Forbidden
        return;
    }

    return next();

}

exports.checkObjectId = async (ctx, next) => {
    const { id } = ctx.params;
    if (!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }
    return next();

}

exports.checkAuth = async (ctx, next) => {
    const { id } = ctx.params;
    const { user } = ctx.request;
    let memo = null;

    try {
        memo = await Memo.findOne({ _id: id }).exec();
    } catch (e) {
        ctx.throw(500, e);
    }

    if (!memo.email === user.email) {
        ctx.status = 401;
        ctx.body = {
            message: "UNAUTHORIZED"
        };
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
            memos = await Memo.find({ email })
                .sort({ _id: -1 })
                .limit(6)
                .lean()
                .exec();

            memos.map(
                (memo, i) => {
                    if (memo.email !== email) {
                        ctx.status = 401;
                        ctx.body = {
                            message: "UNAUTHORIZED"
                        };
                        return;
                    }
                }
            );

            ctx.body = {
                memoList: memos
            };
            return;
        }

        if (lastId !== "") {
            let objId = new mongoose.Types.ObjectId(lastId);
            memos = await Memo.find({ _id: { $lt: objId }, email })
                .sort({ _id: -1 })
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

exports.update = async (ctx) => {
    const { id } = ctx.params;
    const { content } = ctx.request.body;

    if (!content || content === "" || content === null) {
        ctx.status = 409;
        ctx.body = {
            message: "AT LEAST 1 CHARACTER REQUIRED"
        };
        return;
    }

    let memo = null;

    try {
        memo = await Memo.findByIdAndUpdate(id, {
            content,
            updated: true,
            updatedAt: new Date()
        }, { new: true }).exec();

        if (!memo) {
            ctx.status = 404;
            ctx.body = {
                message: "THERE IS NO SUCH MEMO"
            };
            return;
        }

        ctx.body = {
            newMemo: memo
        };
    } catch (e) {
        ctx.throw(500, e);
    }
}

exports.remove = async (ctx) => {

    const { user } = ctx.request;


    const { id } = ctx.params;
    console.log(id);

    let memo = null;

    try {
        memo = await Memo.findOne({_id: id}).exec();
        if (memo.email !== user.email) {
            ctx.status = 401;
            ctx.body = {
                message: "UNAUTHORIZED"
            };
            return;
        }
    } catch (e) {
        ctx.throw(500, e);
    }

    try {
        memo = await Memo.findByIdAndRemove(id).exec();
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        message: "removed"
    };
    ctx.status = 204;


}