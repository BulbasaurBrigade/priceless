const { default: axios } = require('axios');

const router = require('express').Router();

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const parameters = [];
    const { address } = req.query;

    const urlAddress = address.split(' ').join('%20');
    parameters.push(`address=${urlAddress}`);

    parameters.push(`key=${process.env.GEOCODE_API}`);
    const APIRes = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?${parameters.join(
        '&'
      )}`
    );

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

    res.send(APIRes.data.results[0].geometry.location);
  } catch (error) {
    next(error);
  }
});
