const ErrorTypes = require("../utils/errorHandling/errorTypes");

const errorHandling = (error, req, res, next) => {
    console.log(error.cause)
    switch (error.code) {
        case ErrorTypes.ROUTING_ERROR:
            res.status(400).send({status: "error", error: error.name})
            break;
        case ErrorTypes.INVALID_TYPE_ERROR:
            res.status(400).send({status:'error', error: error.name})
            break;
        case ErrorTypes.DATABASE_ERROR:
            res.status(400).send({status:'error', error: error.name})
            break;
        case ErrorTypes.INVALID_PARAM_ERROR:
            res.status(400).send({status:'error', error: error.name})
            break;
        default:
            res.status(500).send({status: "error", error: 'Unhandled Error'})
            break;
    }
}

module.exports = errorHandling;