const router = require('express').Router();
const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.post('/signup', userControllers.userSignup);

router.post('/login', userControllers.userLogin);

router.get('/get-user-data', authMiddleware, userControllers.getUser);

router.post('/update-user-data', authMiddleware, userControllers.updateProfile);

router.post('/profilepic-upload', upload.single('image'), authMiddleware, userControllers.uploadProfilepic);

module.exports = router;