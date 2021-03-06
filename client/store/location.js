/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { CREATE_POST } from './posts';
import { setPreviewLocationError } from './error';

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
    const token = await getAuth().currentUser.getIdToken();
    const res = await axios.get(`/api/location?address=${location}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(_getGeocode(res.data));
  } catch (error) {
    dispatch(setPreviewLocationError(error.response.data));
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
