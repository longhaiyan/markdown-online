const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const cors = require('koa2-cors');
const router = require('./router');
const config = require('./config');

const app = new Koa();

// db start
const { url} = config.db;
const mongoose = require('mongoose');
mongoose.connect(url, {useMongoClient: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('链接成功');
});

// 跨域
// app.use(cors({
//     credentials: true
// }));

// app.use(auth.check);
app.use(bodyParser());

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(config.port);
console.log('当前监听接口', '127.0.0.1:' + config.port);
