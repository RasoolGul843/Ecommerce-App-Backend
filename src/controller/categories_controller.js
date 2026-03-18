const CategoryModel = require("../model/category_model");
const categoryModel=require("../model/category_model")

const categoriesController={
            //////////////----------create category ----------////////////
    createCategory:async function(req,res){

        try{
            const categoryDate=req.body;
            const newCategory=new CategoryModel(categoryDate);
            await newCategory.save();

            return res.json({
                success: true,
                message: "Category created successfully",
                data: newCategory
            });

        }
        catch(error){
            return res.json({
                success: false,
                message: error.message
            }); 
        }

    },

    //////////////----------fetcth all category ----------////////////
    fetchAllCategories: async function (req, res) {

        try {
           
            const allCategories =await categoryModel.find()
           

            return res.json({
                success: true,
                data: allCategories
            });

        }
        catch (error) {
            return res.json({
                success: false,
                message: error.message
            });
        }

    },
    //////////////----------fetcth category by id  ----------////////////
    fetchAllCategoriesByid: async function (req, res) {

        try {
            const id=req.params.id

            const foundCategory = await categoryModel.findById(id)


            return res.json({
                success: true,
                data: foundCategory
            });

        }
        catch (error) {
            return res.json({
                success: false,
                message: error.message
            });
        }

    }
}
module.exports=categoriesController;