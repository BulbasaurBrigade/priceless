import axios from 'axios';
import { CREATE_POST } from './posts';

// action type
const GET_GEOCODE = 'GET_GEOCODE';

// action creator
const _getGeocode = (geocode) => ({
  type: GET_GEOCODE,
  geocode,
});

// thunk creator
export const getGeocode = (location) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/location?address=${location}`);
    dispatch(_getGeocode(res.data));
  } catch (error) {
    console.error(error);
  }
};

// reducer
const stateTemplate = { lat: null, lng: null };
export default (state = stateTemplate, action) => {
  switch (action.type) {
    case CREATE_POST:
      return stateTemplate;
    case GET_GEOCODE:
      return action.geocode;
    default:
      return state;
  }
};
