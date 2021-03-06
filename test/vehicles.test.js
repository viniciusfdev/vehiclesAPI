const vehicleDAO = require("../model/vehicle_dao");
const httpStatus = require("http-status");
const db = require("../model/database");
const request = require("supertest");
const app = require("../app");

const gennRandString = (length = 6) => {
  const string = Math.random().toString(20).substr(2, length);
  return string;
};

let id;

const VEHICLE = {
  placa: gennRandString(3) + "-" + gennRandString(4),
  chassi: gennRandString(),
  renavam: gennRandString(11),
  modelo: gennRandString(10),
  marca: gennRandString(10),
  ano: new Date(),
};

const route = "vehicles";

/**
 * fill database
 */
before(async () => {
  await db.sync();
  const promises = [];
  for (var i = 0; i < 100; i++) {
    promises.push(
      vehicleDAO.create({
        placa: gennRandString(3) + "-" + gennRandString(4),
        chassi: gennRandString(),
        renavam: gennRandString(11),
        modelo: gennRandString(10),
        marca: gennRandString(10),
        ano: new Date(),
      })
    );
  }

  await Promise.allSettled(promises);
});

after(() => process.exit(0));

describe(`POST /api/${route}`, function () {
  it("Create", function (done) {
    request(app)
      .post(`/api/${route}`)
      .send(VEHICLE)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.CREATED)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe(`GET /api/${route}`, function () {
  it("Find All", function (done) {
    request(app)
      .get(`/api/${route}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK)
      .end(function (err, res) {
        if (err) return done(err);
        id = res.body.model[0].id;
        done();
      });
  });
});

describe(`GET /api/${route}`, function () {
  it("Find one", function (done) {
    request(app)
      .get(`/api/${route}/${id}`)
      .send(VEHICLE)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe(`GET /api/${route}`, function () {
  it("Find with filter", function (done) {
    request(app)
      .get(`/api/${route}`)
      .send(VEHICLE)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe(`PUT /api/${route}/id`, function () {
  it("Update entity by id", function (done) {
    request(app)
      .put(`/api/${route}/${id}`)
      .send({ modelo: gennRandString(10) })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe(`DELETE /api/${route}/id`, function () {
  it("Delete by id", function (done) {
    request(app)
      .delete(`/api/${route}/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
