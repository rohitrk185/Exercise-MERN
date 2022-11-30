const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Cant add review without user'],
    },
    review:{
        type: String,
    },
    rating: {
        type: Number,
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Review', reviewSchema);