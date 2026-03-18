const express = require("express");

const categoryRoutes = express.Router();
const categoriesController = require("../controller/categories_controller");

// POST
categoryRoutes.post("/", categoriesController.createCategory);

// GET
categoryRoutes.get("/", categoriesController.fetchAllCategories);
// GET
categoryRoutes.get("/:id", categoriesController.fetchAllCategoriesByid);

module.exports = categoryRoutes;