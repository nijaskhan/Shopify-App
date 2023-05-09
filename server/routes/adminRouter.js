const router = require('express').Router();
const adminControllers = require('../controllers/adminControllers');

router.post('/login', adminControllers.login);

router.get('/get-users', adminControllers.getAllUsers);

module.exports = router;