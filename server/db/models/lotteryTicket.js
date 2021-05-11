const Sequelize = require("sequelize");
const db = require("../db");

const LotteryTicket = db.define("lotteryTicket", {
  isWaiting: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = LotteryTicket;
