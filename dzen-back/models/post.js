"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      models.User.hasMany(Post);
    }
  }
  Post.init(
    {
      parentId: { type: DataTypes.INTEGER, defaultValue: 0 },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
      },
      message: DataTypes.TEXT,
      file: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      indexes: [
        { unique: false, fields: ["parentId"] },
        { unique: false, fields: ["createdAt"] },
      ],
    }
  );
  return Post;
};
