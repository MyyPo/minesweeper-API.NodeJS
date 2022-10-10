const { StatusCodes } = require("http-status-codes");
const BasicAPIError = require("./basic");

class NotFoundError extends BasicAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
