const App = require('./app');

class Test extends App {
    async create(ctx) {
        super.error('errrr');
        return;
    }
}
module.exports = new Test();
