const asyncHandler = require('express-async-handler');

// Models
const Review = require('../models/reviewModel');
const User = require('../models/userModel');


// @desc    -> Post User Review
// @route   -> POST '/api/reviews'
// @access  -> Private
const addReview = asyncHandler (async (req, res) => {
    const user = req.user._id;

    try {
        const id = user._id;
        const { rating, review } = req.body;
        const newReview = await Review.create({ user, review, rating });

        const reviews = await Review.find({}).populate('user', 'name email').sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(400);
        throw new Error(error);
    }
    
});

// @desc    -> Get All User Reviews
// @route   -> GET '/api/reviews'
// @access  -> Private
const getReviews = asyncHandler (async (req, res) => {
    const reviews = await Review.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(reviews);
});


module.exports = {
    addReview,
    getReviews,
};