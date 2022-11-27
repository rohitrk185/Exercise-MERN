const express = require('express');
const router = express.Router();
const { getExercises, toggleExercise } = require('../controllers/exerciseController');
const { protect } = require('../middlewares/authMiddleware');


router.route('/')
    .get(protect, getExercises)
    .post(protect, toggleExercise);


module.exports = router;