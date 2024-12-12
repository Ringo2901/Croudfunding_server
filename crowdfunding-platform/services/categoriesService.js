const {Category} = require("../models");

class CategoriesService {
    constructor() {
    }

    async getCategories() {
        try {
            return await Category.findAll();
        } catch (error) {
            console.error('Ошибка при получении медиафайлов:', error);
            throw error;
        }
    }
}

module.exports = new CategoriesService();