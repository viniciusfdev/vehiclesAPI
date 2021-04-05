const vehicles = require("../model/vehicle_dao");
const router = require("express").Router();
const httpStatus = require("http-status");

router.get("/:id?", (req, res, next) => {
  if (req.params && req.params.id) {
    vehicles
      .findOne({ ...req.params, ...req.query })
      .then((model) => res.status(httpStatus.OK).json({ model }))
      .catch(next);
  } else {
    vehicles
      .findAll(req.query)
      .then((model) => {
        res.status(httpStatus.OK).json({ model });
      })
      .catch(next);
  }
});

router.post("/", (req, res, next) => {
  vehicles
    .create(req.body)
    .then((model) => res.status(httpStatus.CREATED).json({ model }))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  vehicles
    .update(req.body)
    .then((model) => res.status(httpStatus.OK).json({ model }))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  vehicles
    .destroy(req.params)
    .then((model) => res.status(httpStatus.OK).json({ model }))
    .catch(next);
});

module.exports = router;
