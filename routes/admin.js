const express = require("express");
const router = express.Router();
const {
  getAddProduct,
  postAddProducts,
  getAdminProducts,
  getEditProduct,
  postEditProduct,
  getDeleteProduct
} = require("../controllers/products");

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProducts);

router.get("/products", getAdminProducts);

router.get("/edit-product/:productID", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", getDeleteProduct);

module.exports = router;