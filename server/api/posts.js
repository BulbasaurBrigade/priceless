const router = require("express").Router();
const {
  models: { Post },
} = require("../db");
module.exports = router;
const CronJob = require("cron").CronJob;

// GET
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

// POST
router.post("/", async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    // const date = new Date(Date.now() + 10000);
    // const job = new CronJob(date, function () {
    //   console.log("job ran");
    //   post.status = "pending";
    //   post.save();
    // });
    // job.start();
    console.log(post.__proto__);
    await post.setPoster(+req.query.userId);
    res.send(post);
  } catch (err) {
    next(err);
  }
});
