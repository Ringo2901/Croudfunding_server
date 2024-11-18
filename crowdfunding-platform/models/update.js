const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Update extends Model {
        static associate(models) {
            Update.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
        }
    }

    Update.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Update',
            tableName: 'projectupdates',
            timestamps: false,
        }
    );

    return Update;
};
