const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Analytics extends Model {
        static associate(models) {
            Analytics.belongsTo(models.Project, {
                foreignKey: 'project_id',
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
            contributions_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            total_founded: {
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
