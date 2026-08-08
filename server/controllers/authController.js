const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {

    try {

        const { name, email, password,role } = req.body;


// Validate input
if (!name || !email || !password) {
    return res.status(400).json({
        message: "Please provide all fields"
    });
}


        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({

            name,
            email,
            password: hashedPassword,
            role

        });

        // Generate JWT immediately after registration
        const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );


        res.status(201).json({

            message: "User Registered Successfully",
            token,
            user

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};





const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find User
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email"
            });

        }

        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        // Generate JWT Token
        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


module.exports = {

    registerUser,
    loginUser

};