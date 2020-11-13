const express = require("express");
const { getProducts, getProduct } = require("../controllers/products");

const router = express.Router();

// Routes:
router.get("/", getProducts);

router.get("/:productID", getProduct);

module.exports = router;
