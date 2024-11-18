const UserService = require('../services/UserService');

class UserController {

    async register(req, res) {
        try {
            const {nickname, email, password} = req.body;

            if (!nickname || !email || !password) {
                return res.status(400).json({message: 'Все поля обязательны для заполнения'});
            }

            const newUser = await UserService.register({nickname, email, password});

            return res.status(201).json({
                message: 'Пользователь успешно зарегистрирован',
                user: {id: newUser.id, nickname: newUser.nickname, email: newUser.email},
            });
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            return res.status(400).json({message: error.message});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;

            const {token, user} = await UserService.login({email, password});

            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000,
            });

            return res.status(200).json({
                message: 'Успешный вход',
                token,
                user: {id: user.id, nickname: user.nickname, email: user.email},
            });
        } catch (error) {
            console.error('Ошибка при входе:', error);
            return res.status(401).json({message: error.message});
        }
    }

    async logout(req, res) {
        try {
            await UserService.logout(res);

            return res.status(200).json({message: 'Успешный выход'});
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            return res.status(500).json({message: 'Ошибка при выходе'});
        }
    }

    async status(req, res) {
        try {
            await UserService.status(req, res);

            return res;
        } catch (error) {
            console.error('Ошибка при статусе:', error);
            return res.status(500).json({message: 'Ошибка при статусе'});
        }
    }

    async getProfile(req, res) {
        try {
            await UserService.getProfile(req, res);

            return res;
        } catch (error) {
            console.error('Ошибка при получении профиля:', error);
            return res.status(500).json({message: 'Ошибка при получении профиля'});
        }
    }


    async updateProfile(req, res) {
        try {
            await UserService.updateProfile(req, res);

            return res;
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            return res.status(500).json({message: 'Ошибка при обновлении профиля'});
        }
    }

    async getUserProjects(req, res) {
        try {
            await UserService.getProjects(req, res);

            return res;
        } catch (error) {
            console.error('Ошибка при получении проектов пользователя:', error);
            res.status(500).json({error: 'Ошибка при получении проектов пользователя'});
        }
    }
}


module.exports = new UserController();
