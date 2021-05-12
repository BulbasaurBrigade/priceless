const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNullopen: false,
  },
  category: {
    type: Sequelize.ENUM([
      "furniture",
      "clothing",
      "books",
      "decor",
      "kitchen",
      "food",
      "personal care",
      "pet supplies",
      "entertainment",
      `children's items`,
      "other",
    ]),
    defaultValue: "other",
  },
  status: {
    type: Sequelize.ENUM(["lottery", "open", "pending", "claimed"]),
    defaultValue: "lottery",
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(["listing", "request"]),
    defaultValue: "listing",
    allowNull: false,
  },
});

module.exports = Post;
