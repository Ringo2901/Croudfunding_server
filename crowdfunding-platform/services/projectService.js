const { Project, User, Category, Comment, Reward, Update} = require('../models');

class ProjectService {
    async createProject(projectData) {
        try {
            return await Project.create(projectData);
        } catch (error) {
            console.error('Ошибка при создании проекта:', error);
            throw new Error('Ошибка при создании проекта');
        }
    }

    async getAllProjects(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const projects = await Project.findAndCountAll({
            include: [
                {
                    model: User,
                    as: 'initiator',
                    attributes: ['id', 'nickname'],
                },
            ],
            offset,
            limit,
            order: [['created_at', 'DESC']],
        });

        return {
            total: projects.count,
            page,
            pages: Math.ceil(projects.count / limit),
            data: projects.rows,
        };
    }

    async getProjectById(id) {
        const project = await Project.findByPk(id, {
            include: [
                { model: User, as: 'initiator', attributes: ['email', 'firstname', 'lastname'] },
                { model: Category, attributes: ['name'] }
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
                    attributes: ['email', 'firstname', 'lastname'],
                },
            ],
            order: [['created_at', 'DESC']],
        });
    }

    async getTopProjects() {
        return await Project.findAll({
            attributes: ['id', 'title', 'description'],
            order: [['created_at', 'DESC']],
            limit: 5,
            include: [
                {
                    model: User,
                    as: 'initiator',
                    attributes: ['id', 'nickname'],
                },
            ],
        });
    }
}

module.exports = new ProjectService();
