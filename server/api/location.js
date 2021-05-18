const getGeocode = require('../middleware/getGeocode');

const router = require('express').Router();

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const { address } = req.query;

    const geocode = await getGeocode(address);

    // console.log({ APIRes });
    // console.log('the data: ', APIRes.data);
    // console.log(
    //   'the data, results, geometry: ',
    //   APIRes.data.results[0].geometry
    // );
    // console.log(
    //   'the data, results, geometry, location: ',
    //   APIRes.data.results[0].geometry.location
    // );

    res.send(geocode);
  } catch (error) {
    next(error);
  }
});
