const express = require('express');
const router = express.Router();
const { getExercises, addExercise, deleteExercise} = require('../controllers/exerciseController');
const { protect } = require('../middlewares/authMiddleware');


router.route('/')
    .get(protect, getExercises)
    .post(protect, addExercise);

router.route('/:id').delete(protect, deleteExercise);


module.exports = router;