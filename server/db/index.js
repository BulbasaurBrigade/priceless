//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/user");
const LotteryTicket = require("./models/lotteryTicket");
const Chat = require("./models/chat");
const Message = require("./models/message");
const Post = require("./models/post");
const PostImage = require("./models/postImage");

//associations could go here!

User.hasMany(Post, { as: "poster", foreignKey: "posterId" });
Post.belongsTo(User, { as: "poster", foreignKey: "posterId" });

Post.belongsToMany(User, {
  as: "requester",
  foreignKey: "postId",
  through: LotteryTicket,
});
User.belongsToMany(Post, {
  as: "lotteryItem",
  foreignKey: "requesterId",
  through: LotteryTicket,
});

User.belongsToMany(Post, {
  as: "post",
  foreignKey: "recipientId",
  through: Chat,
});
Post.belongsToMany(User, {
  as: "recipient",
  foreignKey: "postId",
  through: Chat,
});

Message.belongsTo(Chat)
Chat.hasMany(Message)

Message.belongsTo(User)
User.hasMany(Message)

Post.hasMany(PostImage);
PostImage.belongsTo(Post);

module.exports = {
  db,
  models: {
    User,
    LotteryTicket,
    Chat,
    Message,
    Post,
    PostImage,
  },
};
