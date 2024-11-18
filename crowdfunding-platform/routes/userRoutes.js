const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authToken');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/status', UserController.status);
router.get('/profile', authenticateToken, UserController.getProfile);
router.put('/profile', authenticateToken, UserController.updateProfile);
router.get('/projects', authenticateToken, UserController.getUserProjects);

module.exports = router;
