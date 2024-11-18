const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Analytics extends Model {
        static associate(models) {
            Analytics.belongsTo(models.Project, {
                foreignKey: 'projectId',
                onDelete: 'CASCADE',
            });
        }
    }

    Analytics.init(
        {
            views: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            backers: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            fundsRaised: {
                type: DataTypes.DECIMAL(10, 2),
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: 'Analytics',
            tableName: 'analytics',
            timestamps: false,
        }
    );

    return Analytics;
};
