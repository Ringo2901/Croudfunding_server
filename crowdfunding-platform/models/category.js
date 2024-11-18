const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Project, {
                foreignKey: 'category_id',
                onDelete: 'SET NULL',
            });
        }
    }

    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: 'Category',
            tableName: 'category',
            timestamps: false,
        }
    );

    return Category;
};
