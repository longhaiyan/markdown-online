// const port = process.env.NODE_ENV === 'prod' ? '80' : '3000';
const port = '3000';

module.exports = {
    onlineMD: {
        root: ''
    },
    port,
    db: {
        url: 'mongodb://127.0.0.1/onlineMD'
    }
};
