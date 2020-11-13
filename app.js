/**
 * Abstract services by having a one for all method
 * e.g const user = db.findBy(clause, tablename);
 * That way, you make a better abstration and only
 * change fewer files when using a new dependency
 * becomes a reality
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const admin = require("./routes/admin");
const shop = require("./routes/shop");
const products = require("./routes/products");

const sequelize = require("./database");

const { User, Product } = require("./models");
const { port } = require("./config");

const { getPageNotFound } = require("./controllers/errors");

// App:
const app = express();

// Templating engine:
app.set("view engine", "pug");

// Middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes:
app.use("/admin", admin);
app.use("/products", products);
app.use("/", shop);
//404 page
app.use(getPageNotFound);

// associations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

// sync models to database by creating appropriate tables if not created
sequelize
  .sync()
  .then(() => {
    // Listener:
    app.listen(port, () => {
      console.log(`app 🚀 on port ${port}`);
    });
  })
  .catch((e) => {
    console.error("Failed to sync with DB", e);
    throw Error(e);
  });
