const AnalyticsService = require('../services/analyticsService');

class AnalyticsController {
    static async getProjectAnalytics(req, res) {
        try {
            const { projectId } = req.params;

            if (!projectId) {
                return res.status(400).json({ error: 'Project ID is required' });
            }

            const analytics = await AnalyticsService.getProjectAnalytics(projectId);
            res.status(200).json(analytics);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getProjectContributions(req, res) {
        try {
            const { projectId } = req.params;

            if (!projectId) {
                return res.status(400).json({ error: 'Project ID is required' });
            }

            const contributions = await AnalyticsService.getProjectContributions(projectId);
            res.status(200).json(contributions);
        } catch (error) {
            console.error('Error fetching contributions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = AnalyticsController;
