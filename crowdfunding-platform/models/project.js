const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, { foreignKey: 'initiator_id', as: 'initiator' });
        Project.belongsTo(models.Category, {
            foreignKey: 'category_id',
            onDelete: 'SET NULL',
        });
    }
  }

  Project.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        goal: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        funding_type: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: { isIn: [['all_or_nothing', 'open_funding']] },
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'active',
          validate: { isIn: [['active', 'completed', 'closed']] },
        },
        start_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        end_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
          category_id: {
              type: DataTypes.INTEGER,
              references: {
                  model: 'category',
                  key: 'category_id',
              },
              onDelete: 'SET NULL',
          },
      },
      {
        sequelize,
        modelName: 'Project',
        tableName: 'projects',
        timestamps: false,
      }
  );

  return Project;
};
