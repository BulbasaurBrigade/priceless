// this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const LotteryTicket = require('./models/lotteryTicket');
const Chat = require('./models/chat');
const Message = require('./models/message');
const Post = require('./models/post');
const PostImage = require('./models/postImage');

// Associations below

// Associating users to posts as the poster
User.hasMany(Post, { as: 'postedItem', foreignKey: 'posterId' });
Post.belongsTo(User, { as: 'poster', foreignKey: 'posterId' });

// Associating users to posts as the recipient
User.hasMany(Post, { as: 'recipientItem', foreignKey: 'recipientId' });
Post.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });

// Creating records of users expressing interest in requesting an item
// through the LotteryTicket through table
Post.belongsToMany(User, {
  as: 'requester',
  foreignKey: 'postId',
  through: LotteryTicket,
});
User.belongsToMany(Post, {
  as: 'lotteryItem',
  foreignKey: 'requesterId',
  through: LotteryTicket,
});

// Associating users to specific chats as either recipients or posters
User.hasMany(Chat, { as: 'posterChat', foreignKey: 'posterId' });
User.hasMany(Chat, { as: 'recipientChat', foreignKey: 'recipientId' });
Chat.belongsTo(User, { as: 'poster', foreignKey: 'posterId' });
Chat.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });

// Each chat will be created when a new combination of poster and recipient
// is created with a specific post
// That is expressed by chats belonging to a post because that will be the best
// constant to get all previous and current chats around a specific listing
Post.hasMany(Chat);
Chat.belongsTo(Post);

// Messages are tied to the chat they belong to
Message.belongsTo(Chat);
Chat.hasMany(Message);

// And the user who sent them
Message.belongsTo(User);
User.hasMany(Message);

// Finally, images are kept in their own table and associated to the post they
// are tied to
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
