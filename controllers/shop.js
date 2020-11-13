const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getIndex = (req, res) => {
  res.status(200).render(
    "shop/index",
    {
      pageTitle: "Shop",
      path: "/"
    }
  );
}

exports.getCart = (req, res) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartData = [];
      for (_product of products) {
        const cartProductData = cart.products.find(product => product.id === _product.id);
        if(cartProductData) {
          cartData.push({ product: _product, quantity: cartProductData.quantity});
        }
      }
      console.log(cartData);
      res.status(200).render(
        "shop/cart",
        {
          pageTitle: "Cart",
          path: "/cart",
          cartData
        }
      );
    })
  })
}

exports.getCheckout = (req, res) => {
  res.status(200).render(
    "shop/checkout",
    {
      pageTitle: "checkout",
      path: "/checkout"
    }
  );
}

exports.getOrders = (req, res) => {
  res.status(200).render(
    "shop/orders",
    {
      pageTitle: "Orders",
      path: "/orders"
    }
  );
}

exports.addToCart = (req, res) => {
  const { productID } = req.body;
  Product.findById(productID, product => {
    Cart.addProduct(productID, product.price)
  });
  res.redirect(`/cart`);
}

exports.postCartDeleteItem = (req, res) => {
  const { productID } = req.body;
  Product.findById(productID, product =>{ 
    Cart.deleteById(productID, product.price);
    res.redirect("/cart");
  });
}