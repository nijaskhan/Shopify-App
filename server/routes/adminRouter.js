const router = require('express').Router();
const adminControllers = require('../controllers/adminControllers');

router.post('/login', adminControllers.login);

module.exports = router;