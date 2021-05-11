const Sequelize = require("sequelize");
const db = require("../db");

const Chat = db.define("chat", {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Chat;
