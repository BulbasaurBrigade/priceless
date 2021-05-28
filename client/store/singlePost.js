/* eslint-disable no-underscore-dangle */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import { getAuth } from 'firebase/auth';

// action type
export const SET_SINGLE_POST = 'SET_SINGLE_POST';
export const ADD_REQUESTER = 'ADD_REQUESTER';
const DESTROY_IMAGE = 'DESTROY_IMAGE';
export const UPDATE_POST = 'UPDATE_POST';

// action creator
export const _setSinglePost = (post) => {
  return {
    type: SET_SINGLE_POST,
    post,
  };
};

export const _addRequester = (post) => {
  return {
    type: ADD_REQUESTER,
    post,
  };
};

export const _destroyImage = (image) => {
  return {
    type: DESTROY_IMAGE,
    image,
  };
};

// thunk
export const setSinglePost = (postId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}`);
      dispatch(_setSinglePost(data));
      document.getElementsByClassName('selected')[0].scrollIntoView();
    } catch (err) {
      console.log('error fetching single post via thunk', err);
    }
  };
};

export const addRequester = (postId, userId) => {
  return async (dispatch) => {
    try {
      const token = await getAuth().currentUser.getIdToken();
      const { data } = await axios.post(
        `/api/posts/${postId}/users/${userId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );

      dispatch(_addRequester(data));
    } catch (err) {
      console.log('error fetching requester via thunk', err);
    }
  };
};

export const destroyImage = (postId, imageId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/posts/${postId}/images/${imageId}`
      );
      dispatch(_destroyImage(data));
    } catch (err) {
      console.log('error destroying image via thunk: ', err);
    }
  };
};

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_POST:
      return state.id === action.post.id ? action.post : state;
    case SET_SINGLE_POST:
    case ADD_REQUESTER:
      return action.post;
    case DESTROY_IMAGE:
      const newPostImages = state.postImages.filter(
        (image) => image.id !== action.image.id
      );
      return { ...state, postImages: newPostImages };
    default:
      return state;
  }
};
