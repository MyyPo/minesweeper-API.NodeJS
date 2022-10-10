const { StatusCodes } = require("http-status-codes");
const BasicAPIError = require("./basic");

class BadRequestError extends BasicAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
