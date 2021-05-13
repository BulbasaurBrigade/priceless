const router = require('express').Router();
const {
  models: { Post, PostImage },
} = require('../db');
module.exports = router;
const CronJob = require('cron').CronJob;

// GET all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({ include: PostImage });
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

// GET all posts filtered by category
router.get('/filtered', async (req, res, next) => {
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
router.get('/:postId', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.postId, { include: PostImage });
    res.send(post);
  } catch (err) {
    next(err);
  }
});

// POST
router.post('/', async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    // const date = new Date(Date.now() + 10000);
    // const job = new CronJob(date, function () {
    //   console.log("job ran");
    //   post.status = "pending";
    //   post.save();
    // });
    // job.start();
    // console.log(post.__proto__);
    // await post.setPoster(+req.query.userId);
    res.send(post);
  } catch (err) {
    next(err);
  }
});
