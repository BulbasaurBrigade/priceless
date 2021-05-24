const router = require('express').Router();
const getGeocode = require('../middleware/getGeocode');
const {
  models: { User, Post, PostImage },
} = require('../db');
module.exports = router;
const { Op } = require('sequelize');
const { requireToken, isAdmin } = require('../middleware/gatekeeping');

router.use('/:userId/chats', require('./chats'));

// GET all users
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and displayName fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'displayName'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.id && !req.user.isAdmin) {
      console.log('param id: ', req.params.id);
      console.log('user id: ', req.user.id);
      throw new Error('You do not have permission to do that');
    }

    const { displayName, location, imageURL } = req.body;

    // Find user
    const user = await User.findByPk(req.params.id);

    // Change displayName
    user.displayName = displayName;

    // Change location
    user.location = location;

    // Convert location string to GeoCode
    const geocode = await getGeocode(location);
    user.latitude = geocode.lat;
    user.longitude = geocode.lng;

    // Proper Photo Stuff will happen here at some point
    // user.imageURL = imageURL;
    await user.save();

    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/posts', requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.id) {
      throw new Error("You don't have permission to view those");
    }
    // grab all posts associated with a particular user and include postImages
    const posts = await Post.findAll({
      where: {
        posterId: req.params.id,
        status: { [Op.ne]: "deleted" },
      },

      //make the most recently updated post appear at the top
      order: [["updatedAt", "DESC"]],
      include: {
        model: PostImage,
      },
    });
    res.send(posts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/lotteryTickets', requireToken, async (req, res, next) => {
  try {
    if (req.user.id !== +req.params.id) {
      throw new Error("You don't have permission to access that information");
    }
    const lottery = await Post.findAll({
      //only sends back active lottery tickets
      where: {
        status: { [Op.notIn]: ["claimed", "deleted"] },
      },
      include: {
        model: User,
        as: 'requester',
        where: {
          id: req.params.id,
        },
        required: true,
        attributes: [],
      },
      attributes: ['id'],
    });
    res.send(lottery);
  } catch (err) {
    next(err);
  }
});
