const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");

//asyncHandler helps us to handle exceptions in async functions in express routes
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;

    //for checking if the user already exists in the DB
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        picture,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            picture: user.picture,
            token: generateToken(user.id),
        });
    }

    else {
        res.status(400);
        throw new Error("Error Occurred! User Not Created");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password, } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            picture: user.picture,
            token: generateToken(user.id),
        });
    }

    else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.picture = req.body.picture || user.picture;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            picture: updatedUser.picture,
            token: generateToken(updatedUser._id)
        });
    }
    else {
        res.status(404);
        throw new Error("User Not Found");
    }

})

module.exports = { registerUser, authUser, updateUserProfile };