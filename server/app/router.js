const Router = require('koa-router');
const router = new Router();
const data = require('./controller/data');
const test = require('./controller/test');

const routerMap = [
  ['get', '/api/data/question/:qid', data, 'question'],
  ['get', '/api/data/create/:qid', data, 'create'],
  ['get', '/api/data/test', test, 'create']
];

routerMap.map(route => {
    const [method, path, controller, action] = route;

    router[method](path, async (ctx, next) => {return controller[action].bind(Object.assign(controller, { ctx }))(ctx, next);}
  );
});

module.exports = router;
