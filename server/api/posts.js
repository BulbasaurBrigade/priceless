const router = require('express').Router();
const { CronJob } = require('cron');
const { Op } = require('sequelize');
const getGeocode = require('../middleware/getGeocode');
const {
  models: { Post, PostImage, Chat },
} = require('../db');
const { requireToken } = require('../middleware/gatekeeping');


module.exports = router;

// GET all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({

      // only finds posts that haven't been claimed or deleted
      where: { status: { [Op.notIn]: ['claimed', 'deleted'] } },
      include: PostImage,
    });
    res.send(posts);
  } catch (err) {
    next(err);
  }
});

// GET all posts filtered by category and map bounds
router.get('/filtered', async (req, res, next) => {
  try {

    const { filter, n, e, s, w, search } = req.query;

    // only finds possts tha haven't been claimed or deleted
    const whereStatement = { status: { [Op.notIn]: ['claimed', 'deleted'] } };

    if (filter) {
      whereStatement.category = filter;
    }

    if (n) {
      whereStatement[Op.and] = [
        { latitude: { [Op.gte]: +s } },
        { latitude: { [Op.lte]: +n } },
        { longitude: { [Op.gte]: +w } },
        { longitude: { [Op.lte]: +e } },
      ];
    }

    if (search) {
      whereStatement[Op.or] = [
        {
          title: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          description: {
            [Op.iLike]: `%${search}%`,
          },
        },
      ];
    }

    const posts = await Post.findAll({
      where: whereStatement,
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

// POST a new post

router.post('/', requireToken, async (req, res, next) => {
  try {
    const {
      imageUrls,
      title,
      description,
      category,
      imageRefs,
      pickupDetails,
      location,
    } = req.body;
    // let {
    //   post: { latitude },
    // } = req.body;
    // let {
    //   post: { longitude },
    // } = req.body;

    const geocode = await getGeocode(location);
    const latitude = geocode.lat;
    const longitude = geocode.lng;

    const post = await Post.create({
      title,
      description,
      latitude,
      longitude,
      category,
      pickupDetails,
      location,
    });

    // Set the user as the poster
    await post.setPoster(+req.query.id);

    // iterate over imageUrls provided
    // create a PostImage for each url, and associate that postImage to the Post
    for (let i = 0; i < imageUrls.length; i++) {
      const currUrl = imageUrls[i];
      // let currRef = imageRefs[i];
      const postImage = await PostImage.create({ imageUrl: currUrl });
      await post.addPostImage(postImage);
    }

    // Re-fetch the post with its just added images
    const { id } = post.dataValues;
    const postWithImage = await Post.findByPk(id, {
      include: PostImage,
    });

    // Create a date object for when the job should run
    // Currently set for 1 minute
    const date = new Date(Date.now() + 10 * 1000);

    // create and schedule the Cron Job to run the lottery
    const job = new CronJob(date, () => {
      post.lottery();
      console.log('time to check');
    });

    // start the job
    job.start();

    // send the post
    res.send(postWithImage);
  } catch (err) {
    if (err.name === 'GeocodeError') {
      res.status(400).send(err.message);
    } else {
      next(err);
    }
  }
});

// PUT edit single post

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    const { imageUrls } = req.body;
    const post = await Post.findByPk(req.params.id, { include: PostImage });
    if (req.user.id !== post.posterId) {
      throw new Error('You do not have permission to do that');
    }
    for (let i = 0; i < imageUrls.length; i++) {
      let currUrl = imageUrls[i];
      //let currRef = imageRefs[i];
      const postImage = await PostImage.create({ imageUrl: currUrl });
      await post.addPostImage(postImage);
    }
    const updatedPost = await post.update(req.body);
    res.send(updatedPost);
  } catch (error) {
    next(error);
  }
});

// DELETE single post - note: this doesn't actually delete a post. it remains in the db.

router.delete('/:id', requireToken, async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (req.user.id !== post.posterId && !req.user.isAdmin) {
      throw new Error('You do not have permission to do that');
    }
    post.status = 'deleted';
    post.save();
    res.send(post);
  } catch (error) {
    next(error);
  }
});

//DELETE /posts/:postId/images/:imageId
router.delete("/:postId/images/:imageId", async (req, res, next) => {
  try {
    const image = await PostImage.findByPk(req.params.imageId);
    console.log(image);
    await image.destroy();
    res.send(image);
  } catch (error) {
    next(error);
  }
});

// PUT to either pass on or claim a post

router.put('/:id/chats/:chatId', requireToken, async (req, res, next) => {
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
      if (req.user.id !== chat.recipientId || req.user.id !== chat.posterId) {
        throw new Error('You do not have permission to do that.');
      }
      message = await post.pass(req.params.chatId);
    } else if (action === 'claim') {
      if (req.user.id !== chat.posterId) {
        throw new Error('You do not have permission to do that.');
      }

      message = await post.claim(req.params.chatId);
    }

    // send the updated chat instance and returned message from the method
    res.send({ chat, message });
  } catch (err) {
    next(err);
  }
});


router.post('/:postId/users/:userId', requireToken, async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.postId, {
      include: {
        model: PostImage,
      },
    });

    await post.addRequester(req.params.userId);
    if (post.status === 'open') {
      await post.lottery(); // post.reload()???
    }
    res.send(post).status(201);
  } catch (err) {
    next(err);
  }
});
