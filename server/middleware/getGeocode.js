const { default: axios } = require('axios');

module.exports = async (address) => {
  const parameters = [];
  const urlAddress = address.split(' ').join('%20');
  parameters.push(`address=${urlAddress}`);

  parameters.push(`key=${process.env.GEOCODE_API}`);
  const APIRes = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?${parameters.join('&')}`
  );
  return APIRes.data.results[0].geometry.location;
};
