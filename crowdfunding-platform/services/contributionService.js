const {Contribution, Reward, Project} = require('../models');
const {Op, Sequelize} = require("sequelize");

class ContributionService {
    async createContribution(req, res) {
        const { user_id, project_id, amount } = req.body;

        if (!user_id || !project_id || !amount || amount <= 0) {
            return res.status(400).json({ error: 'Неверные данные для вклада' });
        }

        try {

            let contribution = await Contribution.findOne({
                where: { user_id, project_id }
            });

            if (contribution) {
                contribution.amount = (parseFloat(contribution.amount) || 0) + parseFloat(amount);

                const reward = await Reward.findOne({
                    where: {
                        project_id,
                        amount: { [Op.lte]: contribution.amount }
                    },
                    order: [['amount', 'DESC']],
                });

                if (reward) {
                    contribution.reward_level_id = reward.id;
                }

                await contribution.save();
            } else {
                const reward = await Reward.findOne({
                    where: {
                        project_id,
                        amount: { [Op.lte]: amount }
                    },
                    order: [['amount', 'DESC']],
                });

                contribution = await Contribution.create({
                    user_id,
                    project_id,
                    amount,
                    reward_level_id: reward ? reward.id : null,
                });
            }

            res.status(200).json({ success: true, contribution });
        } catch (error) {
            console.error('Ошибка при создании/обновлении вклада:', error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getContribution(req, res) {
        try {
            // Получаем параметры из запроса
            const { projectId, userId } = req.params;
            let project_id = projectId;
            let user_id = userId;
            // Проверяем наличие обязательных параметров
            if (!project_id || !user_id) {
                return res.status(400).json({ message: 'Необходимо указать project_id и user_id' });
            }

            // Ищем вклады по указанным параметрам
            const contributions = await Contribution.findAll({
                where: {
                    project_id,
                    user_id
                }
            });

            // Возвращаем результат
            return res.status(200).json({ contributions });
        } catch (error) {
            console.error('Ошибка при получении вкладов:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    async getContributionsByUser(userId) {
        return Contribution.findAll({
            where: { user_id: userId },
            include: [
                { model: Project, attributes: ['id', 'title', 'description', 'goal'] },
                { model: Reward, attributes: ['id', 'title', 'description', 'amount'] },
            ],
        });
    }
}

module.exports = new ContributionService();
