const sqlite3 = require("sqlite3");
const DIR = `${__dirname}/../data`;
const FILE = "database.db";

class Database {
  #db = null;

  /**
   * Return the currect opened database connection.
   * @returns {sqlite3.Database}
   */
  getConn = () => {
    if (this.#db == null) {
      this.#db = new sqlite3.Database(`${DIR}/${FILE}`, (err) => {
        if (err) {
          console.error("DATABASE CONNECTION ERROR");
          process.exit(1);
        }
      });
    }

    return this.#db;
  };

  static sync = () =>
    new Promise((resolve, reject) => {
      const query = `
        CREATE TABLE IF NOT EXISTS vehicle (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          placa VARCHAR NOT NULL UNIQUE,
          chassi VARCHAR NOT NULL UNIQUE,
          renavam VARCHAR NOT NULL UNIQUE,
          modelo VARCHAR NOT NULL,
          marca VARCHAR NOT NULL, 
          ano DATE NOT NULL
        )`;

      const db = new sqlite3.Database(`${DIR}/${FILE}`, (err) => {
        if (err) {
          console.error("DATABASE CONNECTION ERROR");
          process.exit(1);
        }
      });

      db.run(query, (err) => {
        if (err) reject(err);
        else resolve(true);
        db.close();
      });
    });

  /**
   * Execute a QUERY.
   * @param {String} query
   * @param {Array} params
   */
  run = async (query, params = []) =>
    new Promise((resolve, reject) => {
      try {
        console.log("Executing query:", query);
        this.getConn().run(query, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      } catch (error) {
        console.log("ERROR EXECUTING QUERY");
        reject(err.message);
      }
    });

  /**
   * Execute a SELECT statement.
   * @param {String} query
   * @param {Array} params
   */
  find = (query, params = []) =>
    new Promise((resolve, reject) => {
      try {
        console.log("Executing query:", query);
        this.getConn().all(query, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      } catch (_) {
        console.log("ERROR EXECUTING SELECT QUERY");
        reject(err.message);
      }
    });

  /**
   * Execute a SELECT limit statement.
   * @param {String} query
   * @param {Array} params
   */
  findOne = (query, params = []) =>
    new Promise((resolve, reject) => {
      try {
        console.log("Executing query:", query);
        this.getConn().all(query, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows && rows.length > 0 ? rows[0] : null);
        });
      } catch (err) {
        console.log("ERROR EXECUTING SELECT LIMIT QUERY");
        reject(err.message);
      }
    });

  /**
   * Execute a INSERT or UPDATE statement.
   * @param {String} query
   * @param {Array} params
   */
  save = (query, params = []) =>
    new Promise((resolve, reject) => {
      try {
        console.log("Executing query:", query);
        this.getConn().run(query, params, (err) => {
          if (err) reject(err);
          else resolve(true);
        });
      } catch (err) {
        console.log("ERROR EXECUTING INSERT QUERY");
        reject(err.message);
      }
    });

  /**
   * Execute a DELETE statement.
   * @param {String} query
   * @param {Array} params
   */
  destroy = (query, params = []) =>
    new Promise((resolve, reject) => {
      try {
        console.log("Executing query:", query);
        this.getConn().run(query, params, (err) => {
          if (err) reject(err);
          else resolve(true);
        });
      } catch (err) {
        console.log("ERROR EXECUTING DELETE QUERY");
        reject(err.message);
      }
    });
}

module.exports = Database;
