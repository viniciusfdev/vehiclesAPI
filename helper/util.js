const { InternalServerError } = require("./errors");

function logRequest(req, _, next) {
  try {
    console.log(`${req.method.toUpperCase()} request: ${req.originalUrl}`);
    next();
  } catch (error) {
    next(new InternalServerError(error.message));
  }
}

module.exports = { logRequest };
