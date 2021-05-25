const router = require("express").Router({ mergeParams: true });
const { Op } = require("sequelize");
const { requireToken } = require("../middleware/gatekeeping");
const {
  models: { Chat, Post, User, Message, PostImage },
} = require("../db");
module.exports = router;

// GET /api/users/:userId/chats
router.get("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new Error("You do not have permission to view those.");
    }
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [
          {
            posterId: req.params.userId,
          },
          {
            recipientId: req.params.userId,
          },
        ],
      },
      include: {
        model: Post,
        attributes: ["title"],
        include: {
          model: PostImage,
        },
      },
    });
    res.send(chats);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId/chats/:chatId

router.get("/:chatId", requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new Error("You do not have permission to view those.");
    }
    const chat = await Chat.findByPk(req.params.chatId, {
      include: [
        {
          model: Post,
        },
        {
          model: User,
          as: "recipient",
        },
        {
          model: User,
          as: "poster",
        },
      ],
    });

    // const post = await Post.findByPk(chat.postId);

    res.send(chat);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:userId/chats/:chatId/messages
router.get("/:chatId/messages", requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new Error("You do not have permission to view those.");
    }
    const messages = await Message.findAll({
      include: {
        model: User,
        attributes: ["displayName", "imageURL"],
      },
      where: {
        chatId: req.params.chatId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.send(messages);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/:userId/chats/:chatId/messages
router.post("/:chatId/messages", requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.userId) {
      throw new Error("You do not have permission to do that.");
    }

    const { userId, chatId } = req.params;

    const message = await Message.create({ content: req.body.content });

    await message.setUser(userId);
    await message.setChat(chatId);

    res.send(
      await Message.findByPk(message.id, {
        include: {
          model: User,
          attributes: ["displayName", "imageURL"],
        },
      })
    );
  } catch (error) {
    next(error);
  }
});
