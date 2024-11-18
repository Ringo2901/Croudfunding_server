const ProjectService = require('../services/projectService');

class ProjectController {
    async getAllProjects(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const projects = await ProjectService.getAllProjects(page, limit);
            res.status(200).json(projects);
        } catch (error) {
            console.error('Ошибка при получении всех проектов:', error);
            res.status(500).json({ message: 'Ошибка сервера', error: error.message });
        }
    }

    async createProject(req, res) {
        try {
            const { title, description, goal, fundingType, categoryId, initiatorId, startDate, endDate, media } = req.body;

            if (!title || !description || !goal || !fundingType || !categoryId || !initiatorId) {
                return res.status(400).json({ message: 'Не заполнены обязательные поля' });
            }

            const projectData = {
                title,
                description,
                goal,
                funding_type: fundingType,
                category_id: categoryId,
                initiator_id: initiatorId,
                start_date: startDate,
                end_date: endDate
            };

            const project = await ProjectService.createProject(projectData);

            return res.status(201).json({
                message: 'Проект успешно создан',
                project,
            });
        } catch (error) {
            console.error('Ошибка в ProjectController:', error);
            return res.status(500).json({
                message: 'Ошибка при создании проекта',
                error: error.message,
            });
        }
    }

    async getTopProjects(req, res) {
        try {
            const topProjects = await ProjectService.getTopProjects();
            res.status(200).json(topProjects);
        } catch (error) {
            console.error('Ошибка при получении топа проектов:', error);
            res.status(500).json({ message: 'Ошибка сервера', error: error.message });
        }
    }

    async getProjectById(req, res) {
        try {
            const { id } = req.params;
            const project = await ProjectService.getProjectById(id);
            res.status(200).json(project);
        } catch (error) {
            console.error('Ошибка при получении проекта:', error);
            res.status(404).json({ message: 'Ошибка сервера', error: error.message });
        }
    };

    async getUpdates (req, res){
        try {
            const { id } = req.params;
            const updates = await ProjectService.getUpdatesByProjectId(id);
            res.status(200).json(updates);
        } catch (error) {
            console.error('Ошибка при получении апдейтов:', error);
            res.status(500).json({ message: 'Ошибка сервера', error: error.message });
        }
    };


    async getRewards (req, res) {
        try {
            const { id } = req.params;
            const rewards = await ProjectService.getRewardsByProjectId(id);
            res.status(200).json(rewards);
        } catch (error) {
            console.error('Ошибка при получении наград:', error);
            res.status(500).json({ message: 'Ошибка сервера', error: error.message });
        }
    };


    async getComments (req, res) {
        try {
            const { id } = req.params;
            const comments = await ProjectService.getCommentsByProjectId(id);
            res.status(200).json(comments);
        } catch (error) {
            console.error('Ошибка при получении комментариев:', error);
            res.status(500).json({ message: 'Ошибка сервера', error: error.message });
        }
    };
}

module.exports = new ProjectController();
