const express = require('express');
const router = express.Router();
const controllerProduct = require("./controller/products")
const controllerOrder = require("./controller/orders")

router.get('/products', controllerProduct.getAllProducts);
router.post('/orders', controllerOrder.createOrder);

module.exports = router