const { requireToken } = require('../middleware/gatekeeping');
const getGeocode = require('../middleware/getGeocode');

const router = require('express').Router();

module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    const { address } = req.query;

    const geocode = await getGeocode(address);

    res.send(geocode);
  } catch (error) {
    next(error);
  }
});
