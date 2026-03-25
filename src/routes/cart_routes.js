const express = require("express");
const cartRoutes = express.Router();
const cartController = require("../controller/cart_controller");

cartRoutes.get("/:user", cartController.getCartForUser);

cartRoutes.post("/", cartController.addToCart);

cartRoutes.delete("/", cartController.removeToCart);

module.exports = cartRoutes;