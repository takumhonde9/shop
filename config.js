const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  host: process.env.HOST,
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  lang: process.env.DB_LANG,
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
};
