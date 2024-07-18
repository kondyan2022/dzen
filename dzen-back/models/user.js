"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING(50), allowNull: false },
      email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      homepage: { type: DataTypes.STRING(100) },
      avatar: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
      indexes: [
        { unique: false, fields: ["username"] },
        { unique: true, fields: ["email"] },
      ],
    }
  );
  return User;
};
