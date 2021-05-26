/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const {
  models: { Chat, Message, Post },
} = require('./db');

module.exports = (io) => {
  // instance method to run the lottery and select a winner
  // or change the post status to open if there are no current requesters
  Post.prototype.lottery = async function () {
    console.log('running lottery now!');

    try {
      await this.reload();
      if (this.status === 'deleted') return;
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
        io.sockets.emit('post status update', { post: this });

        return;
      }

      // chooses a random integer between 0 and the array's length exclusive
      const randIdx = Math.floor(Math.random() * requestersWaiting.length);

      // uses that number as an index to pick the winner
      const winner = requestersWaiting[randIdx];
      winner.lotteryTicket.isWaiting = false;
      await winner.lotteryTicket.save();
      await this.setRecipient(winner.id);
      this.status = 'pending';
      this.save();

      io.sockets.emit('post status update', { post: this });
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
      // console.log({ poster });
      // console.log({ recipient });
      let opener = `Congrats! You have connected on this post.`;
      const [chat, openingMessage] = await Promise.all([
        Chat.create(),
        Message.create({
          content: opener,
        }),
      ]);

      await Promise.all([
        chat.setPost(this),
        chat.setRecipient(this.recipientId),
        chat.setPoster(this.posterId),
        openingMessage.setChat(chat),
      ]);

      if (this.pickupDetails) {
        const content = `To get you started, here are the pick up details that ${poster.displayName} left for the listing:\n"${this.pickupDetails}"`;
        const pickUpMsg = await Message.create({ content });
        await pickUpMsg.setChat(chat);
      }
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
};
