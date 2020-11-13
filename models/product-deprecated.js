// deprecated: works with mysql2

const Cart = require("./cart");
const db = require("../database")

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   return db.execute(
      `INSERT INTO products (title, imageUrl, description, price)
      VALUES (?, ?, ?, ?)
      `,
      [
        this.title, 
        this.imageUrl,
        this.description,
        this.price
      ]
    );
  }

  // call on class not on inst object
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  update() {
    return db.execute(
      `
      UPDATE 
        products
      SET 
        products.title = ?, products.description = ?, products.price = ?, products.imageUrl = ?
      WHERE
        products.id = ?
      `,
      [ this.title, this.description, this.price, this.imageUrl, this.id]
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE products.id = ? ", [id]);
  }
}