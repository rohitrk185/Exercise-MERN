// Packages
const express = require('express');
const router = express.Router();
// Modules
const { protect } = require('../middlewares/authMiddleware');
const { registerUser, loginUser, getMe, addExercise } = require('../controllers/userController');


router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// router.put('/addExercise/:id', protect, addExercise);

module.exports = router;