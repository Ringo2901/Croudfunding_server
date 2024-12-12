const { Analytics, Contribution, User } = require('../models');

class AnalyticsService {
    static async getProjectAnalytics(projectId) {
        const analytics = await Analytics.findOne({
            where: { project_id: projectId },
        });

        if (!analytics) {
            return {
                views: 0,
                contributions_count: 0,
                total_founded: 0.0,
            };
        }

        return analytics;
    }

    static async getProjectContributions(projectId) {
        const contributions = await Contribution.findAll({
            where: { project_id: projectId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['nickname', 'email'],
                },
            ],
            attributes: ['amount', 'contribution_date'],
        });

        return contributions.map((contribution) => ({
            user: contribution.user.nickname,
            amount: contribution.amount,
            date: contribution.contribution_date,
        }));
    }
}

module.exports = AnalyticsService;
