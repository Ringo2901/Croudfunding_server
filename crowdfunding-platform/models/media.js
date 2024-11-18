const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Media extends Model {
        static associate(models) {
            Media.belongsTo(models.Project, {
                foreignKey: 'project_id',
                onDelete: 'CASCADE',
            });
        }
    }

    Media.init(
        {
            file_path: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            uploaded_at: {
                type: DataTypes.DATE,
            }
        },
        {
            sequelize,
            modelName: 'Media',
            tableName: 'media',
            timestamps: false,
        }
    );

    return Media;
};
