const { StatusCodes } = require("http-status-codes");
const BasicAPIError = require("./basic");

class UnauthenticatedError extends BasicAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
