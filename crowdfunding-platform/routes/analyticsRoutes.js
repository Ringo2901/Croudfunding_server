const express = require('express');
const AnalyticsController = require('../controllers/analyticsController');

const router = express.Router();

router.get('/analytics/:projectId', AnalyticsController.getProjectAnalytics);
router.get('/analytics/:projectId/contributions', AnalyticsController.getProjectContributions);

module.exports = router;
