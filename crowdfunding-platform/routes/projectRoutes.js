const express = require('express');
const ProjectController = require('../controllers/projectController');
const router = express.Router();

router.get('/top', ProjectController.getTopProjects);
router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getProjectById);
router.get('/:id/updates', ProjectController.getUpdates);
router.get('/:id/comments', ProjectController.getComments);
router.get('/:id/rewards', ProjectController.getRewards);
router.post('/create', ProjectController.createProject);
module.exports = router;
