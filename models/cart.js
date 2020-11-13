const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const pth = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  // *** NEEDS FIXING *** //
  static addProduct(id, productPrice) {
    // fetch prev cart
    fs.readFile(pth, (err, content) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(content);
        console.log(cart);
      }
      // find prod index
      const existingProductIndex = cart.products.findIndex(product => product.id === id);
      // find prod
      const existingProduct = cart.products.find(product => product.id === id);
      let updatedProduct
      if (existingProduct) {
        // update the prod qty 
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity += 1;
        // update the cart prod for storing in the file 
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        // create a new prod to add to cart
        updatedProduct = {
          id,
          quantity: 1
        };
      }
      // update the total price
      cart.totalPrice = parseFloat((cart.totalPrice + +productPrice).toFixed(2));
      // add the updated product to the old products
      cart.products = [...cart.products, updatedProduct]
      // save the file
      fs.writeFile(pth, JSON.stringify(cart), (error) => {
        if (error)
          console.log(error);
      })
    });
  }

  static deleteById(id, price) {
    fs.readFile(pth, (error, content) => {
      if (error) {
        return;
      }
      const cart = JSON.parse(content);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(product => product.id === id);

      // find nothing with product id in cart -> dont continue
      if(!product)
        return 

      updatedCart.products = updatedCart.products.filter(
        product => product.id !== id
      );
      updatedCart.totalPrice = parseFloat((cart.totalPrice - price * product.quantity).toFixed(2));

      fs.writeFile(pth, JSON.stringify(updatedCart), error => {
        if (error)
          console.error("Failed to update cart.");
      })
    })
  }
  static getCart(callback) {
    fs.readFile(pth, (error, content) => {
      const cart = JSON.parse(content);
      if (error) {
        callback(null);
      } else {
        callback(cart);
      }
    })
  }
}