import axios from "axios";

//action type
const GET_USER_POSTS = "GET_USER_POSTS";

//action creator
const _getUserPosts = (userPosts) => {
  return {
    type: GET_USER_POSTS,
    userPosts,
  };
};

//thunk creator
export const getUserPosts = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/posts`);
      dispatch(_getUserPosts(data));
    } catch (error) {
      console.log("error fetching user's posts via thunk");
    }
  };
};

//reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_USER_POSTS:
      return action.userPosts;
    default:
      return state;
  }
};
