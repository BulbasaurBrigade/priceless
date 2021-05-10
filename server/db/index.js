//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const LotteryTicket = require('./models/lotteryTicket')
const Chat = require('./models/chat')
const Message = require('./models/message')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    LotteryTicket,
    Chat,
    Message
  },
};
