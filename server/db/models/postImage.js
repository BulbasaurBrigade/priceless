const Sequelize = require('sequelize');
const db = require('../db');

/*
  imageURL: url to where the image is hosted
*/

const PostImage = db.define('postImage', {
  imageUrl: {
    type: Sequelize.TEXT,
  },
});

module.exports = PostImage;
