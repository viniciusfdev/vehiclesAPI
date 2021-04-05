const vehiclesController = require("./controller/vehicle_controller");
const { errorHandler } = require("./helper/errors");
const { logRequest } = require("./helper/util");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest);
app.use("/api/vehicles", vehiclesController);
app.use(errorHandler);

module.exports = app;
