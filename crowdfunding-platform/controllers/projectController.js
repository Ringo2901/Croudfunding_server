const {Update, Reward, Comment} = require('../models');
const ProjectService = require('../services/projectService');

class ProjectController {
    async getAllProjects(req, res) {
        try {
            const {search, category, type, page = 1, limit = 10} = req.query;

            const filters = {search, category, type};
            const pagination = {page: parseInt(page), limit: parseInt(limit)};
            const projects = await ProjectService.getAllProjects(filters, pagination);
            res.status(200).json(projects);
        } catch (error) {
            console.error('Ошибка при получении всех проектов:', error);
            res.status(500).json({message: 'Ошибка сервера', error: error.message});
        }
    }

    async createProject(req, res) {
        try {
            const {title, description, goal, fundingType, categoryId, startDate, endDate} = req.body;

            if (!title || !description || !goal || !fundingType || !categoryId) {
                return res.status(400).json({message: 'Не заполнены обязательные поля'});
            }

            const projectData = {
                title,
                description,
                goal,
                funding_type: fundingType,
                category_id: categoryId,
                initiator_id: req.user.id,
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
            res.status(500).json({message: 'Ошибка сервера', error: error.message});
        }
    }

    async getProjectById(req, res) {
        try {
            const {id} = req.params;
            const project = await ProjectService.getProjectById(id);
            res.status(200).json(project);
        } catch (error) {
            console.error('Ошибка при получении проекта:', error);
            res.status(404).json({message: 'Ошибка сервера', error: error.message});
        }
    };

    async getUpdates(req, res) {
        try {
            const {id} = req.params;
            const updates = await ProjectService.getUpdatesByProjectId(id);
            res.status(200).json(updates);
        } catch (error) {
            console.error('Ошибка при получении апдейтов:', error);
            res.status(500).json({message: 'Ошибка сервера', error: error.message});
        }
    };


    async getRewards(req, res) {
        try {
            const {id} = req.params;
            const rewards = await ProjectService.getRewardsByProjectId(id);
            res.status(200).json(rewards);
        } catch (error) {
            console.error('Ошибка при получении наград:', error);
            res.status(500).json({message: 'Ошибка сервера', error: error.message});
        }
    };


    async getComments(req, res) {
        try {
            const {id} = req.params;
            const comments = await ProjectService.getCommentsByProjectId(id);
            res.status(200).json(comments);
        } catch (error) {
            console.error('Ошибка при получении комментариев:', error);
            res.status(500).json({message: 'Ошибка сервера', error: error.message});
        }
    };

    async addProjectUpdate(req, res) {
        const {projectId} = req.params;
        const {title, content, created_at} = req.body;
        const project_id = projectId || null;
        try {
            const update = await Update.create({
                project_id,
                title,
                content,
                created_at,
            });
            res.status(201).json(update);
        } catch (err) {
            res.status(500).json({error: 'Ошибка при добавлении обновления' + err});
        }
    }

    async addProjectReward(req, res) {
        const {projectId} = req.params;
        const {title, description, amount, created_at} = req.body;
        const project_id = projectId;
        try {
            const reward = await Reward.create({project_id, title, description, amount, created_at});
            res.status(201).json(reward);
        } catch (error) {
            res.status(500).json({error: 'Ошибка добавления вознаграждения'});
        }
    }

    async addProjectComment(req, res) {
        const {projectId} = req.params;
        const {content, created_at, user_id} = req.body;
        const project_id = projectId;
        try {
            const reward = await Comment.create({project_id, content, created_at, user_id});
            res.status(201).json(reward);
        } catch (error) {
            res.status(500).json({error: 'Ошибка добавления комментария' + error});
        }
    }
}

module.exports = new ProjectController();
