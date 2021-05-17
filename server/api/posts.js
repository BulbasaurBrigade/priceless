const router = require('express').Router();
const {
  models: { Post, PostImage, LotteryTicket, Chat },
} = require('../db');
module.exports = router;
const { CronJob } = require('cron');
const { Op } = require('sequelize');

// GET all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { status: { [Op.ne]: 'claimed' } },
      include: PostImage,
    });
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
    await post.lottery();
    res.send(post);
  } catch (err) {
    next(err);
  }
});

// POST a new post
router.post('/', async (req, res, next) => {
  try {
    const { images, title, description, latitude, longitude, category } =
      req.body;

    // Create a new post
    const post = await Post.create({
      title,
      description,
      latitude,
      longitude,
      category,
    });

    // Set the user as the poster
    await post.setPoster(+req.query.id);

    // Create post images and associate with the post
    await Promise.all(
      images.map(async (image) => {
        const postImage = await PostImage.create({ imageUrl: image });
        await post.addPostImage(postImage);
      })
    );

    // Promise.all([ Promise, Promise, Promise])
    // Promise.all([undefined, undefined, undefined]) -- what SZ thinks is happening above

    // Re-fetch the post with its just added images
    const { id } = post.dataValues;
    const postWithImage = await Post.findByPk(id, {
      include: PostImage,
    });

    // Create a date object for when the job should run
    // Currently set for 10 minutes
    const date = new Date(Date.now() + 10 * 60 * 1000);

    // create and schedule the Cron Job to run the lottery
    const job = new CronJob(date, () => {
      post.lottery();
      console.log('time to check');
    });

    // start the job
    job.start();

    // await post.setRequester([2]);

    // send the post
    res.send(postWithImage);
  } catch (err) {
    next(err);
  }
});

// PUT to either pass on or claim a post
router.put('/:id/chats/:chatId', async (req, res, next) => {
  try {
    // find the relevant chat and post
    const chat = await Chat.findByPk(req.params.chatId, {
      include: { model: Post },
    });
    const post = await Post.findByPk(req.params.id);

    let message;

    // close the chat;
    await chat.close();
    await chat.reload();

    // call the correct method based on which action was sent
    const { action } = req.query;
    if (action === 'pass') {
      message = await post.pass(req.params.chatId);
    } else if (action === 'claim') {
      message = await post.claim(req.params.chatId);
    }

    // send the updated chat instance and returned message from the method
    res.send({ chat, message });
  } catch (err) {
    next(err);
  }
});

router.post('/:postId/users/:userId', async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.postId)
    await post.addRequester(req.params.userId)
    if(post.status === 'open') {
      await post.lottery() // post.reload()???
    }
    res.send(post).status(201)
  } catch(err) {
    next(err)
  }
})

