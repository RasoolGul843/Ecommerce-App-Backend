const express = require("express");
const orderRoutes = express.Router();
const orderController = require("../controller/order_controller");

// Create order
orderRoutes.post("/", orderController.createOrder);

// Fetch orders by user ID
orderRoutes.get("/:userId", orderController.fetchOrder);

module.exports = orderRoutes;