const router = require('express').Router({ mergeParams: true });
const { Op } = require('sequelize');
const {
  models: { Chat, Post, User, Message },
} = require('../db');
module.exports = router;

//GET /api/users/:userId/chats
router.get('/', async (req, res, next) => {
  try {
    const chats = await Post.findAll({
      include: { model: User, as: 'recipient', required: true },
      where: {
        [Op.or]: [
          {
            posterId: req.params.userId,
          },
          {
            '$recipient.id$': req.params.userId,
          },
        ],
      },
    });
    res.send(chats);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId/chats/:chatId
router.get('/:chatId', async (req, res, next) => {
  try {
    const chat = await Chat.findByPk(req.params.chatId);

    const post = await Post.findByPk(chat.postId);

    res.send({ ...post.dataValues, isOpen: chat.isOpen });
  } catch (error) {
    next(error);
  }
});

//GET /api/users/:userId/chats/:chatId/messages
router.get('/:chatId/messages', async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      where: {
        chatId: req.params.chatId,
      },
      order: [['createdAt', 'DESC']],
    });

    res.send(messages);
  } catch (error) {
    next(error);
  }
});
