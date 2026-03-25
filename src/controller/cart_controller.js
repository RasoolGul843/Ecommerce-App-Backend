const CartModel = require("../model/cart_model");

const   CartController={

    ///////------- get cart for user by id ------/////////
    getCartForUser: async function (req, res) {
        try {
            const user = req.params.user;

            const foundCart = await CartModel.findOne({ user: user });

            if (!foundCart) {
                return res.json({
                    success: true,
                    data: []
                });
            }

            return res.json({
                success: true,
                data: foundCart.items
            });

        } catch (error) {
            return res.json({
                success: false,
                message: error.message
            });
        }
    },



    ////////--------Add to cart -------///////
    addToCart:async function(req,res){
        try{
         const {
            product,user, quantity}=req.body;

            const foundCart=await CartModel.findOne({user:user});

            if(!foundCart){
                const newCart=new CartModel({user:user});
                newCart.items.push({
                    product:product,
                    quantity:quantity
                });

                await newCart.save();
                return res.json({
                    success:true,
                    data:newCart,
                    message:"product added to cart"
                })

            }

            //////////-----------if cart is already exist ---------//////////
            
            const updatedcart=await CartModel.findOneAndUpdate(
                {user:user},
                {$push:{items:{product:product,quantity:quantity}}},
                {new:true}
                
            );
            return res.json({
                success: true,
                data: updatedcart,
                message: "product added to cart"
            })
        }
        catch(error){
            return res.json({
                success: false,
                message: error.message 
            })
        }
    },

    ///////--------Remove to cart --------////

       removeToCart: async function (req, res) {
        try {

            const {user,product}=req.body;
            const updatedCart=await CartModel.findOneAndUpdate(
                {user:user},
                {$pull:{items:{product:product}}}
            )
            return res.json({
                success: true,
                data: updatedCart,
                message: "product is remove from cart"
            })

        }
        catch (error) {
            return res.json({
                success: false,
                message: error.message
            })

        }
    }

}
module.exports = CartController; 