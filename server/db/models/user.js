const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  displayName: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  location: {
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  authId: {
    type: Sequelize.STRING,
  },
  imageURL: {
    type: Sequelize.TEXT,
  },
});

module.exports = User;
