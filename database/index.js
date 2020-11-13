const Sequelize = require("sequelize");
// const mysql = require("mysql2");

const { database, username, password, host, lang } = require("../config");

module.exports = new Sequelize(database, username, password, {
  dialect: lang,
  host: host,
});

/* DEPRECATED 

// create a connection pool
// creates a pool of connections for handling all your queries
// each query needs a pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "secretpassword"
})

// use promise, to allow us to use promises for each query
module.exports = pool.promise(); */
