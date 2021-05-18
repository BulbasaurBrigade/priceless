const getGeocode = require('../middleware/getGeocode');

const router = require('express').Router();

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const { address } = req.query;

    const geocode = await getGeocode(address);

    res.send(geocode);
  } catch (error) {
    next(error);
  }
});
