const Sequelize = require("sequelize");
const db = require("../db");

const Chat = db.define("chat", {
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

Chat.prototype.close = async function () {
  try {
    this.isOpen = false;
    await this.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = Chat;
