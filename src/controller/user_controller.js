const userModel = require("../model/user_model");
const bcrypt=require("bcryptjs")

const userController = {
           ////////////--------- create new user------------------//////////
    createUser: async function (req, res) {
        try {
            const { fullname, email, password } = req.body;

            ////////////--------- check existing user------------------//////////
            const existingUser = await userModel.findOne({ email });

            if (existingUser) {
                return res.json({
                    success: false,
                    message: "Email already registered"
                });
            }

            const newUser = new userModel({
                fullname,
                email,
                password
            });

            await newUser.save();

            return res.json({
                success: true,
                message: "User created successfully",
                data: foundUser
            });

        } catch (error) {
            return res.json({
                success: false,
                message: error.message
            });
        }
    },
    loginUser:async function(req,res){
        try{
            const {email,password} = req.body;
            
            if(!email || !password){
                return res.json({
                    success: false,
                    message: "Email and password are required"
                });
            }

            const foundUser=await userModel.findOne({email:email});
            if(!foundUser){
                return res.json({
                    success:false,
                    message:"user not found!"
                })
            }
           const passwardMatch= bcrypt.compareSync(password,foundUser.password)
           if(!passwardMatch){
               return res.json({
                   success: false,
                   message: "Passward id not match"
               })
           }
            return res.json({
                success: true,
                message: "User is login"
            })
        }
        catch(error){
            return res.json({
                success: false,
                message: error
            });
        }

    }
};

module.exports = userController;

