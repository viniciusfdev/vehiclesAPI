const httpStatus = require("http-status");
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
        console.log(err)
        console.log(res.body);
        console.log(res.status)
        if (err) return done(err);
        id = res.model[0].id;
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
    VEHICLE.modelo = gennRandString(10);

    request(app)
      .put(`/api/${route}/${id}`)
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
