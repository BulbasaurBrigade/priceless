import axios from "axios";

//action type
const SET_SINGLE_POST = "SET_SINGLE_POST";
export const ADD_REQUESTER = "ADD_REQUESTER";

//action creator
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
//thunk
export const setSinglePost = (postId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}`);
      dispatch(_setSinglePost(data));
      document.getElementsByClassName("selected")[0].scrollIntoView();
    } catch (err) {
      console.log("error fetching single post via thunk", err);
    }
  };
};

export const addRequester = (postId, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/posts/${postId}/users/${userId}`);
      
        dispatch(_addRequester(data));
    } catch (err) {
      console.log("error fetching requester via thunk", err);
    }
  };
};
//reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_POST:
      return action.post;
    case ADD_REQUESTER:
      return action.post;
    default:
      return state;
  }
};
