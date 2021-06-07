const Sequelize = require('sequelize');
const db = require('../db');

/*
  Used as a through table to keep a record of users who requested a post
  isWaiting will default to true because a user is default waiting to be connected
  Is changed to false once the user has won the lottery or connected on an open post
*/

const LotteryTicket = db.define('lotteryTicket', {
  isWaiting: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = LotteryTicket;
