const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add the exercise name'],
    },
    exerciseId:{
        type: String,
        required: [true, 'Please add the exercise ID'],
        unique: true,
    },
    target:{
        type: String,
        required: [true, 'Please add the exercise target'],
    },
    bodyPart:{
        type: String,
        required: [true, 'Please add the body part of the exercise']
    },
    equipment:{
        type: String,
        required: [true, 'Please add the exercise equipment'],
    },
    gifUrl:{
        type: String,
        required: [true, 'Please add the exercise gif URL']
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Exercise', exerciseSchema);