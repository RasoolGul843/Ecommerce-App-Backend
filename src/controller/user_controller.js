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
    loginUser: async function (req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
            }

            const foundUser = await userModel.findOne({ email: email });

            if (!foundUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const passwordMatch = bcrypt.compareSync(password, foundUser.password);

            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Password does not match"
                });
            }

            // Exclude password from the response
            const { password: _, ...userData } = foundUser.toObject();

            return res.json({
                success: true,
                message: "User logged in successfully",
                data: userData
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = userController;

