const httpStatus = require("http-status");

class BadRequestError extends Error {
  constructor(
    warning,
    message = "The request made is incorrect or corrupt, and the server can't understand it"
  ) {
    super(message);
    this.code = httpStatus.BAD_REQUEST;
    this.warning = warning;
  }
}

class InternalServerError extends Error {
  constructor(
    warning,
    message = "The server encountered an internal error or misconfiguration and was unable to complete your request."
  ) {
    super(message);
    this.code = httpStatus.INTERNAL_SERVER_ERROR;
    this.warning = warning;
  }
}

function errorHandler(error, _, res, _) {
  const code =
    typeof error.code == "number"
      ? error.code
      : httpStatus.INTERNAL_SERVER_ERROR;

  res.status(code).json({
    status: code,
    message: error.message,
    warning: error.warning,
  });
}

module.exports = { errorHandler, BadRequestError, InternalServerError };
