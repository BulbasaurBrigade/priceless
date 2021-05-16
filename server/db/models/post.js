const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
const Chat = require("./chat");
const Message = require("./message");

const Post = db.define("post", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
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
      "furniture",
      "clothing",
      "books",
      "decor",
      "kitchen",
      "food",
      "personal care",
      "pet supplies",
      "entertainment",
      `children's items`,
      "other",
    ]),
    defaultValue: "other",
  },
  status: {
    type: Sequelize.ENUM(["lottery", "open", "pending", "claimed"]),
    defaultValue: "lottery",
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM(["listing", "request"]),
    defaultValue: "listing",
    allowNull: false,
  },
});

Post.prototype.lottery = async function () {
  try {
    const requesters = await this.getRequester();
    const requestersWaiting = requesters.filter((requester) => {
      return requester.lotteryTicket.isWaiting;
    });
    if (!requestersWaiting.length) {
      this.status = "open";
      this.save();
      return;
    }
    let winner = requestersWaiting.sort(() => 0.5 - Math.random())[0];
    winner.lotteryTicket.isWaiting = false;
    await winner.lotteryTicket.save();
    await this.setRecipient(winner.id);
    this.status = "pending";
    this.save();
    await this.chat();
  } catch (err) {
    console.log(err);
  }
};

Post.prototype.chat = async function () {
  try {
    const chat = await Chat.create();
    await chat.setPost(this);
    await chat.setRecipient(this.recipientId);
    await chat.setPoster(this.posterId);
  } catch (err) {
    console.log(err);
  }
};

Post.prototype.pass = async function (chatId) {
  try {
    const message = await Message.create({
      content: "This exchange was passed on. This chat is now closed.",
    });
    await message.setChat(chatId);
    this.lottery();
    return message;
  } catch (err) {
    console.log(err);
  }
};

Post.prototype.claim = async function (chatId) {
  try {
    const message = await Message.create({
      content: "This item was successfully claimed. This chat is now closed.",
    });
    await message.setChat(chatId);
    this.status = "claimed";
    this.save();
    return message;
  } catch (err) {
    console.log(err);
  }
};
module.exports = Post;
