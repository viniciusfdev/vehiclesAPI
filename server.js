const db = require("./model/database");
const PORT = process.env.PORT || 8080;
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

db.sync()
  .then(() =>
    server.listen(PORT, () =>
      console.log(`Server API listening on port: ${PORT}`)
    )
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
