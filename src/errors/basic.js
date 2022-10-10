class BasicAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = BasicAPIError;
