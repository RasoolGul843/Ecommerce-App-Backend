const ProductModel = require("../model/product_model");

const ProductController = {

    // Create product
    createProduct: async function (req, res) {
        try {
            const productData = req.body;
            const newProduct = new ProductModel(productData);
            await newProduct.save();
            return res.json({
                success: true,
                data: newProduct,
                message: "Product is created!"
            });
        } catch (error) {
            return res.json({
                success: false,
                message: error.message
            });
        }
    },

    // Fetch all products
    fetchAllProduct: async function (req, res) {
        try {
            const products = await ProductModel.find();
            return res.json({
                success: true,
                data: products,
                message: "All products fetched successfully"
            });
        } catch (error) {
            return res.json({
                success: false,
                message: error.message
            });
        }
    },

    // Fetch products by category
    fetchProductByCategory: async function (req, res) {
        try {
            const categoryId = req.params.id; 
            const products = await ProductModel.find({ category: categoryId });
            return res.json({
                success: true,
                data: products,
                message: "Products fetched by category successfully"
            });
        } catch (error) {
            return res.json({
                success: false,
                message: error.message
            });
        }
    }

};

module.exports = ProductController;