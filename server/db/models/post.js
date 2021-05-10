const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
  posterId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  recipientId: {
    type: Sequelize.INTEGER,
  },
  photoURLs: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  // location: {
  //   type: DataTypes.GEOMETRY("POINT", 4326),
  //   allowNull: false,
  // },
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
