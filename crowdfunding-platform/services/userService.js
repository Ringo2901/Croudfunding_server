const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Project, Contribution} = require('../models');
const { Op } = require('sequelize');

class UserService {
    async register(userData) {
        const { nickname, email, password } = userData;

        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ nickname }, { email }],
            },
        });

        if (existingUser) {
            throw new Error('Пользователь с таким nickname или email уже существует');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return await User.create({
            nickname,
            email,
            password_hash: hashedPassword,
        });
    }

    async login(credentials) {
        const { email, password } = credentials;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('Неверный email или пароль');
        }

        const isPasswordValid = user.validatePassword(password);

        if (!isPasswordValid) {
            throw new Error('Неверный пароль');
        }

        const token = jwt.sign(
            { id: user.id, nickname: user.nickname },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1d' }
        );

        return { token, user };
    }

    async logout(res) {
        res.clearCookie('authToken');
    }

    async getProfile(req, res) {
        const userId = req.user.id;

        try {
            const user = await User.findByPk(userId);
            res.json(user);
        } catch (error) {
            res.status(500).json({error: 'Ошибка при получении данных пользователя'});
        }
    }

    async getProjects(req, res) {
        const initiator_id = req.user.id;

        try {
            const projects = await Project.findAll({where: {initiator_id}});
            res.json(projects);
        } catch (error) {
            res.status(500).json({error: 'Ошибка при получении проектов пользователя'});
        }
    }

    async updateProfile(req, res) {
        const userId = req.user.id;
        const {nickname, email, firstname, lastname} = req.body;

        try {
            const user = await User.findByPk(userId);
            if (user) {
                user.nickname = nickname;
                user.email = email;
                user.firstname = firstname;
                user.lastname = lastname;
                await user.save();
                res.json(user);
            } else {
                res.status(404).json({error: 'Пользователь не найден'});
            }
        } catch (error) {
            res.status(500).json({error: 'Ошибка при обновлении данных пользователя'});
        }
    }

    async status(req, res) {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ isAuthenticated: false });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
            return res.status(200).json({ isAuthenticated: true, user: decoded });
        } catch (error) {
            return res.status(401).json({ isAuthenticated: false });
        }
    }
}

module.exports = new UserService();
