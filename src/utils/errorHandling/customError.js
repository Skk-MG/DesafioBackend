const ErrorTypes = require("./errorTypes");

class CustomError extends Error {
    constructor({name="error", cause, message, code=ErrorTypes.UNKNOWN}) {
        super(message)
        this.name = name;
        this.code = code;
        this.cause = cause;
    }
}

module.exports = CustomError;