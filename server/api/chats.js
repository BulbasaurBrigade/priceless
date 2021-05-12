const router = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { Chat, Post, User },
} = require("../db");
module.exports = router;

router.get("/users/:id", async (req, res, next) => {
  try {
    const chats = await Post.findAll({
      include: { model: User, as: "recipient", required: true },
      where: {
        [Op.or]: [
          {
            posterId: req.params.id,
          },
          {
            "$recipient.id$": req.params.id,
          },
        ],
      },
    });
    res.send(chats);
  } catch (err) {
    next(err);
  }
});
