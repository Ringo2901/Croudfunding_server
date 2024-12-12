const express = require('express');
const UserController = require('../controllers/userController');
const contributionController = require('../controllers/contributionController');
const { authenticateToken } = require('../middlewares/authToken');
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/status', UserController.status);
router.get('/profile', authenticateToken, UserController.getProfile);
router.put('/profile', authenticateToken, UserController.updateProfile);
router.get('/projects', authenticateToken, UserController.getUserProjects);
router.get('/:userId/contribution/:projectId', contributionController.getContribution)
router.get('/:userId/contributions', contributionController.getContributionsByUser)
module.exports = router;
