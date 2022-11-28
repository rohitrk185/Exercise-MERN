// Packages
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
// Models
const User = require('../models/userModel');


// @desc   -> Register New User
// @route  -> POST '/api/users'
// @access -> Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // Check for all fields in body
    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if user exists already
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new User
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        exercises: [],
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user Data');
    }
});


// @desc    -> Authenticate a User
// @route   -> POST '/api/users/login'
// @access  -> Public 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user-email
    const user = await User.findOne({ email });
    await user.populate('exercises');
    // console.log(user.exercises);

    let exercises = [];
    for(let i = 0; i < user.exercises.length; ++i) {
        exercises.push(user.exercises[i].exerciseId);
    }

    // console.log(exercises);
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email,
            exercises,
            token: generateToken(user._id),
        });
    } else{
        res.status(400);
        throw new Error('Invalid credentials');
    }
});


// @desc   -> Get logged-in User-Data
// @route  -> GET '/api/users/me'
// @access -> Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});


// @desc   -> Add Exercise to User Exercise List
// @route  -> PATCH '/api/users/addExercise/:id'
// @access -> Private
// const addExercise = asyncHandler(async (req, res) => {
//     const id = req.params.id;
//     // Check for user
//     if(!req.user) {
//         res.status(401);
//         throw new Error('User not found');
//     }

//     const user = await User.findById(req.user._id);
// });



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};


module.exports = {
    registerUser,
    loginUser,
    getMe,
};