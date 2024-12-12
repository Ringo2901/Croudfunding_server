const { Project, User, Category, Comment, Reward, Update, Media, Analytics} = require('../models');
const {Op} = require("sequelize");

class ProjectService {
    async createProject(projectData) {
        try {
            let project = await Project.create(projectData)
            await Analytics.create({project_id: project.id, views: 0, total_founded: 0, contributions_count: 0})
            return project;
        } catch (error) {
            console.error('Ошибка при создании проекта:', error);
            throw new Error('Ошибка при создании проекта');
        }
    }

    async getAllProjects(filters, pagination) {
        const { search = '', category = '', type = ''} = filters;
        const{ page = 1, limit = 10 } = pagination;
        const where = {};

        if (search) {
            where.title = { [Op.like]: `%${search}%` };
        }

        if (category) {
            where.category_id = category;
        }

        if (type) {
            if (type === "Все или ничего"){
                where.funding_type = "all_or_nothing";
            }
            if (type === "Открытое финансирование"){
                where.funding_type = "no_obligation"
            }
        }

        const offset = (page - 1) * limit;

        const { count, rows } = await Project.findAndCountAll({
            where,
            include: [
                { model: User, as: 'initiator', attributes: ['nickname'] },
                { model: Category, attributes: ['name'] },
                { model: Media, as: 'media', attributes: ['file_path'], limit: 1},
                { model: Analytics, as: 'analytics', attributes: ['total_founded'] },
            ],
            limit,
            offset,
        });

        return {
            data: rows,
            totalPages: Math.ceil(count / limit),
        };
    }

    async getProjectById(id) {
        const project = await Project.findByPk(id, {
            include: [
                { model: User, as: 'initiator', attributes: ['email', 'firstname', 'lastname', 'nickname'] },
                { model: Category, attributes: ['name'] },
                {
                    model: Media,
                    as: 'media',
                    attributes: ['file_path']
                },
                {
                    model: Analytics,
                    as: 'analytics',
                    attributes: ['total_founded']
                },
            ]
        });
        if (!project) throw new Error('Проект не найден');
        return project;
    }

    async updateProject(id, updates) {
        const project = await Project.findByPk(id);
        if (!project) throw new Error('Проект не найден');
        await project.update(updates);
        return project;
    }

    async deleteProject(id) {
        const project = await Project.findByPk(id);
        if (!project) throw new Error('Проект не найден');
        await project.destroy();
    }

    async getUpdatesByProjectId(projectId) {
        return await Update.findAll({
            where: { project_id: projectId },
            order: [['created_at', 'DESC']],
        });
    }

    async getRewardsByProjectId(projectId) {
        return await Reward.findAll({
            where: { project_id: projectId },
            order: [['amount', 'ASC']],
        });
    }

    async getCommentsByProjectId(projectId) {
        return await Comment.findAll({
            where: { project_id: projectId },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['email', 'firstname', 'lastname', 'nickname'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }

    async getTopProjects() {
        return await Project.findAll({
            order: [['created_at', 'DESC']],
            limit: 5,
            include: [
                {
                    model: User,
                    as: 'initiator',
                    attributes: ['id', 'nickname'],
                },
                {
                    model: Media,
                    as: 'media',
                    attributes: ['file_path'],
                    limit: 1,
                },
                {
                    model: Analytics,
                    as: 'analytics',
                    attributes: ['total_founded']
                },
            ],
        });
    }
}

module.exports = new ProjectService();
