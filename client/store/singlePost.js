import axios from "axios";

//action type
const SET_SINGLE_POST = "SET_SINGLE_POST";

//action creator
export const _setSinglePost = (post) => {
  return {
    type: SET_SINGLE_POST,
    post,
  };
};

//thunk
export const setSinglePost = (postId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/posts/${postId}`);
      dispatch(_setSinglePost(data));
    } catch (err) {
      console.log("error fetching single post via thunk");
    }
  };
};

//reducer
export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_POST:
      return action.post;
    default:
      return state;
  }
};
