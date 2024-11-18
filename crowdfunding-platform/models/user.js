const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {

    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.password_hash);
    }
  }

  User.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        password_hash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
          nickname: {
              type: DataTypes.STRING,
              allowNull: false,
          },
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
           type: DataTypes.STRING,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
      }
  );

  return User;
};
