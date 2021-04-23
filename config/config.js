const body_parser = require('body-parser');
const jsonParser = body_parser.json();
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({
    level: process.env.LOG_LEVEL || 'debug',
    prettyPrint: {
        colorize: true
    }
} );

const expressLogger = expressPino({logger});

module.exports = {
    app: {
        address: '127.0.0.1',
        port: process.env.PORT || 8000,
    },
    db: (address, port, collectionName) => {
        return `mongodb://${address}:${port}/${collectionName}`;
    },
    logger: () => {
        return expressLogger
    }
}