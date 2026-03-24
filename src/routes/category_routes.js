const express = require("express");

const categoryRoutes = express.Router();
const categoriesController = require("../controller/categories_controller");

//////////-------------- POST ------------//////////
categoryRoutes.post("/", categoriesController.createCategory);

//////////--------------    Get ------------//////////
categoryRoutes.get("/", categoriesController.fetchAllCategories);
//////////--------------    Get bY ID  ------------//////////
categoryRoutes.get("/:id", categoriesController.fetchAllCategoriesByid);

module.exports = categoryRoutes;