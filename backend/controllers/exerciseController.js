// Packages
const asyncHandler = require('express-async-handler');
// Models
const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel');


// @desc    -> Get User Exercises
// @route   -> GET '/api/exercises'
// @access  -> Private
const getExercises = asyncHandler (async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })
        .select('-password')
        .populate('exercises');
    
    // for(let i = 0; i < user.exercises.length; ++i) {
    //     user.exercises[i] = user.exercises[i].exerciseId;
    // }

    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        exercises: user.exercises,
    });
});


// @desc    -> Toggle Exercise from user
// @route   -> POST '/api/exercises'
// @access  -> Private
const toggleExercise = asyncHandler (async (req, res) => {
    const { 
        name, exerciseId, 
        target, bodyPart, 
        equipment, gifUrl,
    } = req.body;
    
    if(!name || !exerciseId || !target || !bodyPart || !equipment || !gifUrl ) {
        res.status(400)
        throw new Error('Please Add All Data');
    }

    // Check for user
    if(!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    const user = await User.findOne({ email: req.user.email, });
    
    let exercise = await Exercise.findOne({ exerciseId, });
    if(!exercise) {
        exercise = await Exercise.create({
            name, exerciseId,
            target,bodyPart,
            equipment, gifUrl,
        });
    }

    const isPresent = user.exercises.includes(exercise._id);
    if(!isPresent) {
        user.exercises.push(exercise._id);
    } else {
        user.exercises.pull(exercise._id);
    }
    await user.save();
    // console.log(user);

    await user.populate('exercises');
    let exercises = [];
    for(let i = 0; i < user.exercises.length; ++i) {
        exercises.push(user.exercises[i].exerciseId);
    }

    res.status(200).json({
        exercises: exercises,
    });
});



module.exports = {
    getExercises,
    toggleExercise,
};