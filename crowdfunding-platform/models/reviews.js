const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });
            Review.belongsTo(models.Project, {
                foreignKey: 'projectId',
                onDelete: 'CASCADE',
            });
        }
    }

    Review.init(
        {
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: { min: 1, max: 5 },
            },
            comment: {
                type: DataTypes.TEXT,
            },
        },
        {
            sequelize,
            modelName: 'Review',
            tableName: 'reviews',
            timestamps: true,
        }
    );

    return Review;
};
