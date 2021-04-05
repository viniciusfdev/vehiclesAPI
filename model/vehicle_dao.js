const { BadRequestError } = require("../helper/errors");
const Database = require("./database");
const dao = new Database();

exports.findAll = (args) => {
  let query = `SELECT * FROM vehicle`;

  if (Object.keys(args).length > 0) {
    query += ` WHERE `;
    Object.keys(args).forEach((arg) => (query += `${arg} = ?`));
  }

  return dao.find(query, Object.values(args));
};

exports.findOne = (args) => {
  let query = `SELECT * FROM vehicle`;

  if (Object.keys(args).length > 0) {
    query += ` WHERE `;
    Object.keys(args).forEach((arg) => (query += `${arg} = ?`));
  }

  return dao.findOne(query, Object.values(args));
};

exports.create = (args) => {
  if (!args.placa || !args.renavam || !args.chassi || !args.modelo || !args.ano)
    throw new BadRequestError("No required attributes passed");

  let query = `INSERT INTO vehicle`;

  if (Object.keys(args).length > 0) {
    query += ` (${Object.keys(args)}) `;
    query += ` VALUES (${Object.values(args).map((a) => `'${a}'`)}) `;
  }

  return dao.save(query);
};

exports.update = ({ id, placa, chassi, renavam, modelo, ano }) => {
  let params = { placa, chassi, renavam, modelo, ano };

  if (!placa && !renavam && !chassi && !modelo && !ano)
    throw new BadRequestError("No required attributes passed");

  let query = `UPDATE vehicle SET  `;

  if (params) {
    Object.keys(params)
      .filter((k) => params[k])
      .forEach((k) => (query += ` ${k} = '${params[k]}', `));

    query = query.substring(0, query.length - 2);

    query += ` WHERE id = ${id} `;
  }

  return dao.save(query);
};

exports.destroy = ({ id }) => {
  let query = `DELETE FROM vehicle WHERE id = ${id}`;
  return dao.destroy(query);
};
