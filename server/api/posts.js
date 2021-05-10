const router = require("express").Router();
const {
  models: { Post },
} = require("../db");
module.exports = router;
const CronJob = require("cron").CronJob;

// POST
router.post("/", async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    const date = new Date(Date.now() + 10000);
    const job = new CronJob(date, function () {
      console.log("job ran");
      post.status = "pending";
      post.save();
    });
    job.start();
    res.send(post);
  } catch (err) {
    next(err);
  }
});
