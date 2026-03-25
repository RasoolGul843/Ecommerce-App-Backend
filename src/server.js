const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

// MongoDB connection (Mongoose 7+)
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

               //--------- Routes--------//

             /////----- User Routes -----////
const userRoutes = require("./routes/user_routes");
app.use("/api/user", userRoutes);

           /////----- category Routes -----////
const categoriesRoutes = require("./routes/category_routes");
app.use("/api/category", categoriesRoutes);

          /////----- category Routes -----////
const productsRoutes = require("./routes/products_routes");
app.use("/api/products", productsRoutes);

/////----- cart Routes -----////
const cartRoutes = require("./routes/cart_routes");
app.use("/api/cart", cartRoutes);



// Start server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));