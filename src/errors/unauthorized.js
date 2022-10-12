const { StatusCodes } = require("http-status-codes");
const BasicAPIError = require("./basic");

class UnauthorizedError extends BasicAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;
