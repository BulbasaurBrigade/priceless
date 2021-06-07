/* eslint-disable func-names */
const Sequelize = require('sequelize');
const db = require('../db');

/*
  Through Associations, connects a unique combination of:
    User as Poster
    User as Recipient
    Post
  Groups messages together for chats
  {
    isOpen: boolean that changes to false once a user has hit pass or claim on the exchange
  }
*/

const Chat = db.define('chat', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

// closes a chat
Chat.prototype.close = async function () {
  try {
    this.isOpen = false;
    await this.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = Chat;
