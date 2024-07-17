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
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        targetKey: "id",
      });
      models.User.hasMany(Post, {
        foreignKey: "userId",
        as: "posts",
        targetKey: "id",
      });
    }
  }
  Post.init(
    {
      parentId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      messageText: DataTypes.TEXT,
      attachedFile: DataTypes.STRING,
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
