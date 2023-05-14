const router = require('express').Router();
const adminControllers = require('../controllers/adminControllers');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

router.post('/login', adminControllers.login);

router.get('/get-users', adminControllers.getAllUsers);

router.get('/delete-user/:id', adminAuthMiddleware, adminControllers.deleteUser);

router.post('/update-user', adminAuthMiddleware, adminControllers.updateUser);

router.post('/searchUser', adminAuthMiddleware, adminControllers.searchUsers);

module.exports = router;