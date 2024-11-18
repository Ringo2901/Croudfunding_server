const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Reward extends Model {
        static associate(models) {
            Reward.belongsTo(models.Project, {
                foreignKey: 'project_id',
                onDelete: 'CASCADE',
            });
        }
    }

    Reward.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            amount: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Reward',
            tableName: 'rewards',
            timestamps: false,
        }
    );

    return Reward;
};
