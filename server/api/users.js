const router = require('express').Router();
const getGeocode = require('../middleware/getGeocode');
const {
  models: { User },
} = require('../db');
module.exports = router;

router.use('/:userId/chats', require('./chats'));

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
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
