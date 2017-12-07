const mongoose = require('mongoose');
const Data = new mongoose.Schema({// 定义一个Schema,仅代表数据结构
    qid: {
        type: String
    },
    followers: Number,
    readers: Number,
    answers: Number,
    createTime: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Data', Data); // 将该Schema发布为Model
