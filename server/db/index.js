//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const LotteryTicket = require('./models/lotteryTicket')
const Chat = require('./models/chat')
const Message = require('./models/message')
const Post = require('./models/post');

//associations could go here!

Post.hasMany(LotteryTicket)
LotteryTicket.belongsTo(Post)

Post.hasMany(Chat)
Chat.belongsTo(Post)

Chat.hasMany(Message)
Message.belongsTo(Chat)

module.exports = {
  db,
  models: {
    User,
    LotteryTicket,
    Chat,
    Message,
    Post,
  },
};
