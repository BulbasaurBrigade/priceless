const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
  posterId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  recipientId: {
    type: Sequelize.STRING,
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
  location: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM([
      'furniture',
      'clothing',
      'books',
      'decor',
      'kitchen',
      'other',
    ]),
  },
  status: {
    type: Sequelize.ENUM(['lottery', 'open', 'pending', 'claimed']),
    defaultValue: 'lottery',
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(['listing', 'request']),
    defaultValue: 'listing',
    allowNull: false,
  },
});

module.exports = Post;
