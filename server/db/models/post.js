/* eslint-disable func-names */
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');
const Chat = require('./chat');
const Message = require('./message');

const Post = db.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  pickupDetails: {
    type: Sequelize.TEXT,
  },
  location: {
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  category: {
    type: Sequelize.ENUM([
      'furniture',
      'clothing',
      'books',
      'decor',
      'kitchen',
      'food',
      'personal care',
      'pet supplies',
      'entertainment',
      `children's items`,
      'other',
    ]),
    defaultValue: 'other',
  },
  status: {
    type: Sequelize.ENUM(['lottery', 'open', 'pending', 'claimed']),
    defaultValue: 'lottery',
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(['listing', 'request']),
    defaultValue: 'listing',
    allowNull: false,
  },
});

// instance method to run the lottery and select a winner
// or change the post status to open if there are no current requesters
Post.prototype.lottery = async function () {
  console.log('running lottery now!');
  try {
    // get all of a post's associated requesters
    const requesters = await this.getRequester();

    // filter through to only pull requesters who are currently waiting
    // and haven't passed
    const requestersWaiting = requesters.filter((requester) => {
      return requester.lotteryTicket.isWaiting;
    });

    // if there are none, change post status to open
    if (!requestersWaiting.length) {
      this.status = 'open';
      this.save();
      return;
    }

    // randomly sort the waiting requesters and pick the first one as winner
    const winner = requestersWaiting.sort(() => 0.5 - Math.random())[0];
    winner.lotteryTicket.isWaiting = false;
    await winner.lotteryTicket.save();
    await this.setRecipient(winner.id);
    this.status = 'pending';
    this.save();

    // create a chat for this new post, poster, recipient combo
    await this.chat();
  } catch (err) {
    console.log(err);
  }
};

// Creates a new chat when a new recipient is selected
Post.prototype.chat = async function () {
  try {
    const poster = await this.getPoster();
    const recipient = await this.getRecipient();
    console.log({ poster });
    console.log({ recipient });
    const [chat, message] = await Promise.all([
      Chat.create(),
      Message.create({
        content: `Congrats! You have connected on the post: ${this.title}.`,
      }),
    ]);

    await Promise.all([
      chat.setPost(this),
      chat.setRecipient(this.recipientId),
      chat.setPoster(this.posterId),
      message.setChat(chat),
    ]);
  } catch (err) {
    console.log(err);
  }
};

// Allows a user to pass and runs the lottery again
Post.prototype.pass = async function (chatId) {
  try {
    // send a message to the chat letting participants see it was passed on
    const message = await Message.create({
      content: 'This exchange was passed on. This post is now closed.',
    });
    await message.setChat(chatId);
    await this.setRecipient(null);

    // run lottery again
    this.lottery();

    // return message to pass it through to the redux store
    return message;
  } catch (err) {
    console.log(err);
  }
};

Post.prototype.claim = async function (chatId) {
  try {
    // send a message to the chat letting participants see it was marked claimed
    const message = await Message.create({
      content: 'This item was successfully claimed. This post is now closed.',
    });
    await message.setChat(chatId);

    // Mark post as claimed
    this.status = 'claimed';
    this.save();

    // return message to pass it through to the redux store
    return message;
  } catch (err) {
    console.log(err);
  }
};

module.exports = Post;
