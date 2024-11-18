const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {
                foreignKey: 'user_id',
                onDelete: 'CASCADE',
                as: 'user'
            });
            Comment.belongsTo(models.Project, {
                foreignKey: 'project_id',
                onDelete: 'CASCADE',
            });
        }
    }

    Comment.init(
        {
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Comment',
            tableName: 'comments',
            timestamps: false,
        }
    );

    return Comment;
};
