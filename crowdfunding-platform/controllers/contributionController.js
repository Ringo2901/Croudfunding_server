const ContributionService = require("../services/contributionService");

class ContributionController {

    async createContribution(req, res) {
        const comments = await ContributionService.createContribution(req, res);
    };

    async getContribution(req, res) {
        await ContributionService.getContribution(req, res);
    };

    async getContributionsByUser(req, res) {
        try {
            const contributions = await ContributionService.getContributionsByUser(req.params.userId);
            res.status(200).json(contributions);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = new ContributionController();