const ErrorTypes = require("../utils/errorHandling/errorTypes");

const errorHandling = (error, req, res, next) => {
    switch (error.code) {
        case ErrorTypes.ROUTING_ERROR:
            req.logger.warning(error.cause)
            res.status(400).send({status: "error", error: error.name})
            break;
        case ErrorTypes.INVALID_TYPE_ERROR:
            req.logger.warning(error.cause)
            res.status(400).send({status:'error', error: error.name})
            break;
        case ErrorTypes.DATABASE_ERROR:
            req.logger.warning(error.cause)
            res.status(400).send({status:'error', error: error.name})
            break;
        case ErrorTypes.INVALID_PARAM_ERROR:
            req.logger.warning(error.cause)
            res.status(400).send({status:'error', error: error.name})
            break;
        default:
            req.logger.fatal(error.cause)
            res.status(500).send({status: "error", error: 'Unhandled Error'})
            break;
    }
}

module.exports = errorHandling;