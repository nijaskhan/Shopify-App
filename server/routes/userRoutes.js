const router = require('express').Router();
const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', userControllers.userSignup);

router.post('/login', userControllers.userLogin);

router.get('/get-user-data', authMiddleware, userControllers.getUser);

module.exports = router;