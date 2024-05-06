const winston = require('winston');

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({level: 'debug', format: winston.format.json()})
    ],
    defaultMeta: {env: 'DEV'}
})

const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({level: 'info'}),
        new winston.transports.File({filename: './logs/errors.log', level: 'error'})
    ],
    defaultMeta: {env: 'PROD'}
})

module.exports = {
    devLogger,
    prodLogger
}