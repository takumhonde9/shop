const express = require("express");
const {
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  addToCart,
  postCartDeleteItem,
} = require("../controllers/shop");

const router = express.Router();

router.get("/", getIndex);

router.get("/cart", getCart);

router.post("/cart", addToCart);

router.get("/checkout", getCheckout);

router.get("/orders", getOrders);

router.post("/cart-delete-item", postCartDeleteItem);

module.exports = router;
