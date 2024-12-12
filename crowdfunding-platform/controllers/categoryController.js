const CategoriesService = require("../services/categoriesService");

class CategoryController {

    async getCategories(req, res) {
        try {
            const comments = await CategoriesService.getCategories();
            res.status(200).json(comments);
        } catch (error) {
            console.error('Ошибка при получении категорий:', error);
            res.status(500).json({message: 'Ошибка сервера', error: error.message});
        }
    };
}

module.exports = new CategoryController();