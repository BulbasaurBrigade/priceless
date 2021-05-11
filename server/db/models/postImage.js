const Sequelize = require("sequelize");
const db = require("../db");

const PostImage = db.define("postImage", {
  imageUrl: {
    type: Sequelize.TEXT,
  },
});

module.exports = PostImage;
