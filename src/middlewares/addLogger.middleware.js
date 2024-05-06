const {devLogger, prodLogger} = require('../utils/logger');

const addLogger = (req, res, next) => {
    
    if(process.env.NODE_ENV == 'production') {
        req.logger = prodLogger
    } else {
        req.logger = devLogger
    }

    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

module.exports = addLogger;