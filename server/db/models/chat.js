const Sequelize = require("sequelize");
const db = require("../db");

const Chat = db.define("chat", {
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Chat;
