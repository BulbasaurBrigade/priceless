const { default: axios } = require('axios');

module.exports = async (address) => {
  try {
    const parameters = [];
    const urlAddress = address.split(' ').join('%20');
    parameters.push(`address=${urlAddress}`);

    parameters.push(`key=${process.env.GEOCODE_API}`);
    const APIRes = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?${parameters.join(
        '&'
      )}`
    );
    return APIRes.data.results[0].geometry.location;
  } catch (err) {
    if (err.name === 'TypeError') {
      const customErr = new Error(
        "There was a problem verifying the post location. Please try a different location and preview the marker to make sure it's where you expect it to be."
      );
      err.name = 'GeocodeError';
      throw customErr;
    }
    throw err;
  }
};
