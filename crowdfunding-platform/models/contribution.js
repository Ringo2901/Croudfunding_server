const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Contribution extends Model {
        static associate(models) {
            Contribution.belongsTo(models.User, {
                foreignKey: 'user_id',
                onDelete: 'CASCADE',
                as: 'user'
            });
            Contribution.belongsTo(models.Project, {
                foreignKey: 'project_id',
                onDelete: 'CASCADE'
            });
            Contribution.belongsTo(models.Reward, {
                foreignKey: 'reward_level_id'
            });
        }
    }

    Contribution.init(
        {
            amount: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
            contribution_date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Contribution',
            tableName: 'contribution',
            timestamps: false,
        }
    );

    return Contribution;
};
