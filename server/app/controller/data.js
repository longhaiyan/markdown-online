const DataModel = require('../model/data');
const App = require('./app');

class Data extends App {
    async question() {
        const { qid } = this.ctx.params;
        const data = await DataModel.find({
            qid
        }).sort({
            createTime: -1
        }).exec();
        this.ctx.body = {data};
    }
    async create() {
        const { qid } = this.ctx.params;
        const DataEntity = new DataModel({qid});
        DataEntity.save();
        console.log('DataEntity.qid', DataEntity.qid);
        const data = await DataModel.find({qid})
                            .exec();
        super.result(data);
    }
}
module.exports = new Data();
