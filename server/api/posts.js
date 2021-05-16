const router = require("express").Router();
const {
  models: { Post, PostImage, LotteryTicket, Chat },
} = require("../db");
module.exports = router;
const CronJob = require("cron").CronJob;
const { Op } = require("sequelize");
// GET all posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { status: { [Op.ne]: "claimed" } },
      include: PostImage,
    });
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

// GET all posts filtered by category
router.get("/filtered", async (req, res, next) => {
  try {
    const { filter } = req.query;
    const posts = await Post.findAll({
      where: { category: filter },
      include: PostImage,
    });
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

// GET a single post by ID
router.get("/:postId", async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.postId, { include: PostImage });
    await post.lottery();
    res.send(post);
  } catch (err) {
    next(err);
  }
});

// POST
router.post("/", async (req, res, next) => {
  try {
    const { images, title, description, latitude, longitude, category } =
      req.body;
    const post = await Post.create({
      title,
      description,
      latitude,
      longitude,
      category,
    });

    await post.setPoster(+req.query.id);
    await Promise.all(
      images.map(async (image) => {
        const postImage = await PostImage.create({ imageUrl: image });
        await post.addPostImage(postImage);
      })
    );

    const id = post.dataValues.id;
    const postWithImage = await Post.findByPk(id, {
      include: PostImage,
    });

    // cron
    const date = new Date(Date.now() + 10000);
    const job = new CronJob(date, function () {
      post.lottery();
      console.log("time to check");
    });
    job.start();
    // await post.setPoster(1);
    // await post.setRequester([2, 3, 4, 5]);

    res.send(postWithImage);
  } catch (err) {
    next(err);
  }
});

// PUT
router.put("/:id/chats/:chatId", async (req, res, next) => {
  try {
    const chat = await Chat.findByPk(req.params.chatId);
    const post = await Post.findByPk(req.params.id);
    let message;
    await chat.close();
    await chat.reload();
    const { action } = req.query;
    if (action === "pass") {
      message = await post.pass();
    } else if (action === "claim") {
      message = await post.claim();
    }
    res.send({ chat, message });
  } catch (err) {
    next(err);
  }
});
