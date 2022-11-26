// Packages
const asyncHandler = require('express-async-handler');
// Models
const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel');


// @desc    -> Get User Exercises
// @route   -> GET '/api/exercises'
// @access  -> Private
const getExercises = asyncHandler (async (req, res) => {
    const user = await User.find({ _id: req.user._id })
        .populate('exercises');
    res.status(200).json(user.exercises);
});


// @desc    -> Add Exercise
// @route   -> POST '/api/exercises'
// @access  -> Private
const addExercise = asyncHandler (async (req, res) => {
    const { 
        name, exerciseId, 
        target, bodyPart, 
        equipment, gifUrl,
    } = req.body;
    
    if(!name || !exerciseId || !target || !bodyPart || !equipment || !gifUrl ) {
        res.status(400)
        throw new Error('Please Add All Data');
    }

    const user = req.user;

    let exercise = await Exercise.find({ exerciseId, });
    if(!exercise) {
        exercise = await Exercise.create({
            name, exerciseId,
            target,bodyPart,
            equipment, gifUrl,
        });
    }
    user.exercises.push(exercise._id);
    await user.save();

    res.status(200).json(exercise);
});


// @desc    -> Delete Exercise from user
// @route   -> DELETE '/api/exercises/:id'
// @access  -> Private
const deleteExercise = asyncHandler (async (req, res) => {
    const exerciseId = req.params.id.toString();
    const exercise = await Exercise.find({ exerciseId, });
    if(!exercise) {
        res.status(400);
        throw new Error('Exercise not found');
    }

    // Check for user
    if(!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    const user = req.user;
    user.exercises.filter((exercise) => exercise.exerciseId !== exerciseId);

    await user.save();

    res.status(200).json({ user, exerciseId });
});



module.exports = {
    getExercises,
    addExercise,
    deleteExercise,
};