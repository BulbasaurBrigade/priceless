const router = require("express").Router();
const getGeocode = require("../middleware/getGeocode");
const {
  models: { User, Post, PostImage },
} = require("../db");
module.exports = router;
const { Op } = require("sequelize");

router.use("/:userId/chats", require("./chats"));

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { displayName, location, imageURL } = req.body;

    // Find user
    const user = await User.findByPk(req.params.id);

    // Change displayName
    user.displayName = displayName;

    // Change location string to GeoCode
    const geocode = await getGeocode(location);
    user.latitude = geocode.lat;
    user.longitude = geocode.lng;

    // Proper Photo Stuff will happen here at some point
    user.imageURL = imageURL;
    await user.save();

    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", async (req, res, next) => {
  try {
    //grab all posts associated with a particular user and include postImages
    const posts = await Post.findAll({
      where: {
        posterId: req.params.id,
      },
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
router.get("/:id/lotteryTickets", async (req, res, next) => {
  try {
    const lottery = await Post.findAll({
      where: {
        status: { [Op.ne]: "claimed" },
      },
      include: {
        model: User,
        as: "requester",
        where: {
          id: req.params.id,
        },
        required: true,
        attributes: [],
      },
      attributes: ["id"],
    });
    res.send(lottery);
  } catch (err) {
    next(err);
  }
});
