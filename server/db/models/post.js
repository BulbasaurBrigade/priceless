/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

const { Sequelize } = require('sequelize');
const db = require('../db');

/*
  Post Fields

  {
    title: user typed title string
    description: user typed description of item(s)
    pickupDetails: optional user string describing pick up times or locations
    location: user entered string sent to the geocoding API
    latitude/longitude: floats received from the geocoding API
    category: enum list that must match the list in the frontend filter
    status: lottery status, used for user information and filtering in front end
    type: allows potential addition of request posts in the future
  }

  The lottery is run as an instance method on a Post
  However, in order to avoid cyclic dependencies, those functions are created
  and added to the Post prototype in a separate function written in server/lottery.js
  and called in server/index.js

*/

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  pickupDetails: {
    type: Sequelize.TEXT,
  },
  location: {
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM([
      'furniture',
      'clothing',
      'books',
      'decor',
      'kitchen',
      'food',
      'personal care',
      'pet supplies',
      'entertainment',
      "children's items",
      'sports',
      'tech',
      'other',
    ]),
    defaultValue: 'other',
  },
  status: {
    type: Sequelize.ENUM(['lottery', 'open', 'pending', 'claimed', 'deleted']),
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
