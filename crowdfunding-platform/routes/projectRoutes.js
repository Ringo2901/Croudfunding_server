const express = require('express');
const ProjectController = require('../controllers/projectController');
const CategoryController = require('../controllers/categoryController');
const ContributionController = require('../controllers/contributionController');
const {authenticateToken} = require("../middlewares/authToken");
const router = express.Router();

router.get('/top', ProjectController.getTopProjects);
router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getProjectById);
router.get('/:id/updates', ProjectController.getUpdates);
router.get('/:id/comments', ProjectController.getComments);
router.get('/:id/rewards', ProjectController.getRewards);
router.post('/create', authenticateToken, ProjectController.createProject);
router.post('/payment', ContributionController.createContribution);

router.post('/:projectId/updates', ProjectController.addProjectUpdate);
router.post('/:projectId/rewards', ProjectController.addProjectReward);
router.post('/:projectId/comments', ProjectController.addProjectComment);
module.exports = router;
