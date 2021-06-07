const Sequelize = require('sequelize');
const db = require('../db');

/*
  Message fields
  which user sent the message done through Sequelize Associations
  {
    content: whatever the user types in their message
  }
*/
const Message = db.define('message', {
  content: {
    type: Sequelize.TEXT,
  },
});

module.exports = Message;
