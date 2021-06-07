const Sequelize = require('sequelize');
const db = require('../db');

/* The User Fields:
  {
    displayName: user created identifier string, displayed on posts and chats
    isAdmin: bool to allow access to restricted paths
    location: user entered string describing their location that is passed to the geocoding API
    latitude/longitude: floats received from geocoding API
    authId: the specific Firebase user id associated with the account
    imageURL: URL to user's profile picture
  }
*/

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
