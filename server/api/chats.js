const router = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { Chat, Post, User, Message },
} = require("../db");
module.exports = router;

//GET /api/users/:userId/chats
router.get("/", async (req, res, next) => {
  try {
    const chats = await Post.findAll({
      include: { model: User, as: "recipient", required: true },
      where: {
        [Op.or]: [
          {
            posterId: req.params.userId,
          },
          {
            "$recipient.id$": req.params.userId,
          },
        ],
      },
    });
    res.send(chats);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/:userId/chats/:chatId/messages
router.get("/:chatId/messages", async (req, res, next) => {
  try {
    const chatAndMessages = await Chat.findByPk(req.params.chatId, {
      include: { model: Message, order: [["createdAt", "DESC"]] },
    });
    res.send(chatAndMessages);
  } catch (error) {
    next(error);
  }
});
