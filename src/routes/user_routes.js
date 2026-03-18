const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");

// POST /api/user/createUser
router.post("/createUser", userController.createUser);
router.post("/LoginUser", userController.loginUser);

module.exports = router;